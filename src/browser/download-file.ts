import {noop} from '../function/noop.ts';
import {formatDateForFileName} from '../misc/format-date-for-file-name.ts';
import {isAbortError} from '../predicate/is-abort-error.ts';
import type {MaybePromise} from '../types/maybe-promise.ts';
import {typeOf} from '../value/type-of.ts';

/** The data `downloadFile` saves as a file */
export type DownloadFileData =
  | Blob
  | string
  | ArrayBufferLike
  | ArrayBufferView
  | Response
  | ReadableStream<Uint8Array>;

/** Options of `downloadFile` */
export interface DownloadFileOptions {
  /**
   * The MIME type of the file.
   * Defaults to the type of a `Blob` or a response, `text/plain;charset=utf-8` for a
   * string and `application/octet-stream` for other data
   */
  type?: string;

  /**
   * Whether to let the user choose where to save the file in a "Save as" dialog, in browsers
   * that support it (Chromium-based ones).
   * The file is then written as a stream, without holding all of it in memory.
   *
   * Elsewhere, or when the dialog can't be shown (in a cross-origin iframe, or more than a few
   * seconds after the user's last click), the file is downloaded as usual.
   * Pass a promise as `data` instead of awaiting it, so the dialog opens right away.
   *
   * The file the user chooses is emptied as soon as they choose it, so it stays empty when
   * getting or writing the data fails.
   * Defaults to `false`
   */
  picker?: boolean;
}

// Not in the DOM types, as only Chromium-based browsers have it
type ShowSaveFilePicker = (options: {suggestedName: string}) => Promise<FileSystemFileHandle>;

const DEFAULT_FILE_NAME_PREFIX = 'untitled_';
const DEFAULT_TEXT_TYPE = 'text/plain;charset=utf-8';
const DEFAULT_BINARY_TYPE = 'application/octet-stream';

/**
 * The download may start after `click()` returns, and revoking the URL before that breaks it
 * ([it did in iOS Safari](https://bugs.webkit.org/show_bug.cgi?id=212279)).
 * No event tells when it starts, so the delay is long, as in `FileSaver.js`: keeping the blob
 * longer only costs memory, while revoking early loses the file
 */
const REVOKE_URL_DELAY_MS = 40_000;

const BUFFER_TYPES: ReadonlySet<string> = new Set(['ArrayBuffer', 'SharedArrayBuffer']);

const getFileName = (fileName: string | undefined, data: unknown) =>
  fileName ||
  (data instanceof File ? data.name : `${DEFAULT_FILE_NAME_PREFIX}${formatDateForFileName()}`);

const isBlobCompatible = (bytes: Uint8Array): bytes is Uint8Array<ArrayBuffer> =>
  bytes.buffer instanceof ArrayBuffer && !bytes.buffer.resizable;

const toBytes = (data: ArrayBufferLike | ArrayBufferView) => {
  if (ArrayBuffer.isView(data)) {
    return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
  }

  const dataType = typeOf(data);
  // Like a `Blob` from another window, which would otherwise give an empty file
  if (!BUFFER_TYPES.has(dataType)) {
    throw new TypeError(`Cannot save ${dataType} as a file`);
  }

  return new Uint8Array(data);
};

const assertResponseOk = (response: Response) => {
  if (!response.ok) {
    throw new Error(
      `Cannot download a response with status ${response.status} ${response.statusText}`.trim(),
      {cause: response},
    );
  }
};

const toBlob = async (data: DownloadFileData, type: string | undefined) => {
  if (data instanceof Blob) {
    return type == null ? data : new Blob([data], {type});
  }

  if (data instanceof Response) {
    assertResponseOk(data);
    const blob = await data.blob();
    return type == null ? blob : new Blob([blob], {type});
  }

  if (data instanceof ReadableStream) {
    return new Blob([await new Response(data).blob()], {type: type ?? DEFAULT_BINARY_TYPE});
  }

  if (typeof data === 'string') {
    return new Blob([data], {type: type ?? DEFAULT_TEXT_TYPE});
  }

  const bytes = toBytes(data);
  // `Blob` rejects views of shared and resizable buffers, so they are copied
  return new Blob([isBlobCompatible(bytes) ? bytes : new Uint8Array(bytes)], {
    type: type ?? DEFAULT_BINARY_TYPE,
  });
};

const toStream = async (data: DownloadFileData) => {
  if (data instanceof ReadableStream) {
    return data;
  }

  if (data instanceof Response && data.body) {
    assertResponseOk(data);
    return data.body;
  }

  return (await toBlob(data, undefined)).stream();
};

/**
 * Saves data as a file on the user's device, like a click on a download link does.
 * Meant for files that a page generates or gets on its own, like an export to CSV or a file
 * fetched with an authorization header.
 *
 * By default, the browser saves the file in its usual way: most browsers save it to the
 * downloads folder right away, some first ask the user where to save it.
 * With `picker`, Chromium-based browsers show a "Save as" dialog instead.
 *
 * Works in the main thread of a browser only.
 * Things a page can't control:
 * - Some browsers ask the user before letting a page download several files in a row.
 * - In a sandboxed iframe, downloads need `allow-downloads` in the `sandbox` attribute.
 * - A file from another origin needs CORS to be fetched; pass the response of that request.
 * @param data - The contents of the file: a `Blob` or `File`, a string (saved as UTF-8),
 * bytes, a `fetch` response (its body), or a stream of bytes.
 * Can be a promise of them.
 * @param fileName - The name to save the file with, like `report.csv`.
 * Browsers replace characters that file names can't have.
 * Defaults to the name of a `File`, otherwise to `untitled` with the current date and time,
 * like `untitled_2026-10-25_14-30-05`.
 * An empty string is ignored the same way, so `fileName` can be passed even when it's unknown.
 * With `picker`, the name of a `File` given as a promise isn't known when the dialog opens, so
 * pass the name in that case.
 * @param options - Options.
 * @returns A promise that resolves when the file is handed to the browser or written: to `false`
 * when the user closes the "Save as" dialog, otherwise to `true`.
 * The browser may still show its own dialog that the user can cancel.
 * @throws {Error} When `data` is a response with a status outside 200-299; the response is the
 * error's `cause`.
 * @throws {TypeError} When `data` is of another type, like a `Blob` from another window.
 * @example
 * // Excel needs the byte order mark to open a UTF-8 CSV file correctly
 * await downloadFile(`\uFEFF${csv}`, 'report.csv', {type: 'text/csv'});
 * @example
 * // With the current date and time in the name, like `report_2026-10-25_14-30-05.csv`
 * await downloadFile(csv, `report_${formatDateForFileName()}.csv`);
 * @example
 * // A file that needs an authorization header
 * await downloadFile(fetch('/api/invoice', {headers}), 'invoice.pdf');
 * @example
 * // Shows a "Save as" dialog where possible, while the file is still being generated
 * button.addEventListener('click', async () => {
 *   const isSaved = await downloadFile(generateVideo(), 'video.webm', {picker: true});
 * });
 */
// eslint-disable-next-line unicorn/consistent-boolean-name -- Not a predicate
export const downloadFile = async (
  data: MaybePromise<DownloadFileData>,
  fileName?: string,
  options: DownloadFileOptions = {},
): Promise<boolean> => {
  const pickerGlobal: typeof globalThis & {showSaveFilePicker?: ShowSaveFilePicker} = globalThis;
  if (options.picker && pickerGlobal.showSaveFilePicker) {
    // Before the dialog empties the file the user chooses
    if (data instanceof Response) {
      assertResponseOk(data);
    }

    // The data can fail while the dialog is open or after the user closes it, which would be
    // reported as unhandled. Awaiting it below still rejects
    Promise.resolve(data).catch(noop);
    // Opened before the data is ready, as the dialog can only be shown shortly after a click
    const fileHandle = await pickerGlobal
      .showSaveFilePicker({suggestedName: getFileName(fileName, data)})
      // `undefined` when the dialog can't be shown
      .catch((error: unknown) => (isAbortError(error) ? null : undefined));
    if (fileHandle === null) {
      return false;
    }

    if (fileHandle) {
      const stream = await toStream(await data);
      await stream.pipeTo(await fileHandle.createWritable());
      return true;
    }
  }

  const resolvedData = await data;
  const url = URL.createObjectURL(await toBlob(resolvedData, options.type));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = getFileName(fileName, resolvedData);
  // Isn't added to the document, so that its click doesn't reach the page's click listeners
  anchor.click();
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, REVOKE_URL_DELAY_MS);

  return true;
};
