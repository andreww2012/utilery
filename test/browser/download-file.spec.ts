// @vitest-environment happy-dom
import {type DownloadFileData, downloadFile} from '../../src/browser/download-file.ts';
import {concatUint8Arrays} from '../../src/bytes/concat-uint8-arrays.ts';
import {noop} from '../../src/function/noop.ts';
import type {MaybePromise} from '../../src/types/maybe-promise.ts';

type GetData = () => MaybePromise<DownloadFileData>;

interface NameCase {
  name: string;
  getData: GetData;
  fileName: string | undefined;
  expected: string;
}

const OBJECT_URL = 'blob:https://example.com/0';
const now = new Date(2026, 9, 25, 14, 30, 5);
const UNTITLED_FILE_NAME = 'untitled_2026-10-25_14-30-05';
const TEXT = 'Привет, 世界 👋'; // cspell:disable-line

const encoder = new TextEncoder();

const toBytes = (...values: number[]) => new Uint8Array(values);

const toBytesIn = (buffer: ArrayBufferLike, ...values: number[]) => {
  const bytes = new Uint8Array(buffer);
  bytes.set(values);
  return bytes;
};

const toStream = (...chunks: Uint8Array[]) =>
  new ReadableStream<Uint8Array>({
    start: (controller) => {
      chunks.forEach((chunk) => {
        controller.enqueue(chunk);
      });
      controller.close();
    },
  });

const INPUTS: readonly {name: string; getData: GetData; expected: Uint8Array}[] = [
  {name: 'a string as UTF-8', getData: () => TEXT, expected: encoder.encode(TEXT)},
  {name: 'an empty string', getData: () => '', expected: toBytes()},
  {name: 'a Blob', getData: () => new Blob([TEXT]), expected: encoder.encode(TEXT)},
  {name: 'a File', getData: () => new File([toBytes(1, 2)], 'file.bin'), expected: toBytes(1, 2)},
  {
    name: 'a view of a part of a buffer',
    getData: () => toBytes(0, 1, 2, 3, 4).subarray(1, 4),
    expected: toBytes(1, 2, 3),
  },
  {
    name: 'a DataView',
    getData: () => new DataView(toBytes(9, 8, 7, 6).buffer, 1, 2),
    expected: toBytes(8, 7),
  },
  {name: 'an ArrayBuffer', getData: () => toBytes(1, 2).buffer, expected: toBytes(1, 2)},
  {
    name: 'a view of a SharedArrayBuffer',
    getData: () => toBytesIn(new SharedArrayBuffer(3), 1, 2, 3),
    expected: toBytes(1, 2, 3),
  },
  {
    name: 'a SharedArrayBuffer',
    getData: () => toBytesIn(new SharedArrayBuffer(3), 1, 2, 3).buffer,
    expected: toBytes(1, 2, 3),
  },
  {
    name: 'a view of a resizable buffer',
    getData: () => toBytesIn(new ArrayBuffer(2, {maxByteLength: 4}), 4, 5),
    expected: toBytes(4, 5),
  },
  {name: 'a response', getData: () => new Response(TEXT), expected: encoder.encode(TEXT)},
  {name: 'a response without a body', getData: () => new Response(null), expected: toBytes()},
  {
    name: 'a stream',
    getData: () => toStream(toBytes(1), toBytes(2, 3)),
    expected: toBytes(1, 2, 3),
  },
  {name: 'a promise', getData: () => Promise.resolve(TEXT), expected: encoder.encode(TEXT)},
];

const createAbortError = () => new DOMException('The user aborted a request.', 'AbortError');

const waitForTask = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 0);
  });

const trackUnhandledRejections = () => {
  const onUnhandledRejection = vi.fn<() => void>();
  process.on('unhandledRejection', onUnhandledRejection);
  onTestFinished(() => {
    process.off('unhandledRejection', onUnhandledRejection);
  });
  return onUnhandledRejection;
};

const mockObjectUrls = () => ({
  createObjectURL: vi.spyOn(URL, 'createObjectURL').mockReturnValue(OBJECT_URL),
  revokeObjectURL: vi.spyOn(URL, 'revokeObjectURL').mockImplementation(noop),
});

const mockClick = () => vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(noop);

const getSavedBlob = (createObjectURL: ReturnType<typeof mockObjectUrls>['createObjectURL']) => {
  const [object] = createObjectURL.mock.lastCall || [];
  if (!(object instanceof Blob)) {
    throw new TypeError('No Blob was passed to `URL.createObjectURL`');
  }

  return object;
};

const getClickedAnchor = (click: ReturnType<typeof mockClick>) => {
  const [anchor] = click.mock.contexts;
  if (!(anchor instanceof HTMLAnchorElement)) {
    throw new TypeError('No anchor was clicked');
  }

  return anchor;
};

const readBytes = async (blob: Blob) => new Uint8Array(await blob.arrayBuffer());

// Rejects views of shared and resizable buffers, like `Blob` in browsers and unlike happy-dom's
class BrowserLikeBlob extends Blob {
  constructor(parts: BlobPart[] = [], options?: BlobPropertyBag) {
    parts.forEach((part) => {
      if (
        ArrayBuffer.isView(part) &&
        (!(part.buffer instanceof ArrayBuffer) || part.buffer.resizable)
      ) {
        throw new TypeError('The provided ArrayBufferView value must not be shared or resizable');
      }
    });
    super(parts, options);
  }
}

interface MockPickerOptions {
  pick?: () => Promise<void>;
  write?: () => void;
}

const mockPicker = ({pick, write}: MockPickerOptions = {}) => {
  const chunks: Uint8Array[] = [];
  const state = {isClosed: false, isAborted: false};
  const createWritable = vi.fn<() => Promise<WritableStream<Uint8Array>>>(() =>
    Promise.resolve(
      new WritableStream({
        write: (chunk) => {
          write?.();
          chunks.push(chunk);
        },
        close: () => {
          state.isClosed = true;
        },
        abort: () => {
          state.isAborted = true;
        },
      }),
    ),
  );
  const showSaveFilePicker = vi.fn<
    (options: {suggestedName: string}) => Promise<{createWritable: typeof createWritable}>
  >(async () => {
    await pick?.();
    return {createWritable};
  });
  Object.defineProperty(globalThis, 'showSaveFilePicker', {
    value: showSaveFilePicker,
    configurable: true,
  });

  return {
    state,
    createWritable,
    showSaveFilePicker,
    getWrittenBytes: () => concatUint8Arrays(chunks),
  };
};

describe('browser/downloadFile', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    vi.useRealTimers();
    Reflect.deleteProperty(globalThis, 'showSaveFilePicker');
  });

  it.each<{name: string; getData: GetData}>([
    {name: 'a SharedArrayBuffer', getData: () => toBytesIn(new SharedArrayBuffer(3), 1, 2, 3)},
    {
      name: 'a resizable buffer',
      getData: () => toBytesIn(new ArrayBuffer(3, {maxByteLength: 4}), 1, 2, 3),
    },
  ])("copies bytes of $name, which browsers don't let `Blob` read", async ({getData}) => {
    vi.stubGlobal('Blob', BrowserLikeBlob);
    const {createObjectURL} = mockObjectUrls();
    mockClick();

    await downloadFile(getData(), 'file');

    await expect(readBytes(getSavedBlob(createObjectURL))).resolves.toStrictEqual(toBytes(1, 2, 3));
  });

  describe('download link', () => {
    it.each(INPUTS)('saves $name', async ({getData, expected}) => {
      const {createObjectURL} = mockObjectUrls();
      mockClick();

      await expect(downloadFile(getData(), 'file')).resolves.toBe(true);

      await expect(readBytes(getSavedBlob(createObjectURL))).resolves.toStrictEqual(expected);
    });

    it('clicks a link that downloads the file under the name, without adding it to the page', async () => {
      mockObjectUrls();
      const click = mockClick();

      await downloadFile(TEXT, '報告 👋.txt');

      expect(click).toHaveBeenCalledOnce();

      const anchor = getClickedAnchor(click);

      expect(anchor.href).toBe(OBJECT_URL);
      expect(anchor.download).toBe('報告 👋.txt');
      expect(anchor.isConnected).toBe(false);
    });

    it('revokes the object URL 40 seconds after the click', async () => {
      vi.useFakeTimers();
      const {revokeObjectURL} = mockObjectUrls();
      mockClick();

      await downloadFile(TEXT, 'file.txt');
      vi.advanceTimersByTime(39_999);

      expect(revokeObjectURL).not.toHaveBeenCalled();

      vi.advanceTimersByTime(1);

      expect(revokeObjectURL).toHaveBeenCalledExactlyOnceWith(OBJECT_URL);
    });

    it.each<NameCase>([
      {
        name: 'the given name',
        getData: () => new File([TEXT], 'notes.txt'),
        fileName: 'renamed.txt',
        expected: 'renamed.txt',
      },
      {
        name: 'the name of a File',
        getData: () => new File([TEXT], 'notes.txt'),
        fileName: undefined,
        expected: 'notes.txt',
      },
      {
        name: 'the name of a File given as a promise',
        getData: () => Promise.resolve(new File([TEXT], 'notes.txt')),
        fileName: undefined,
        expected: 'notes.txt',
      },
      {
        name: '`untitled` with the date and time for other data',
        getData: () => TEXT,
        fileName: undefined,
        expected: UNTITLED_FILE_NAME,
      },
      {
        name: '`untitled` with the date and time for an empty name',
        getData: () => TEXT,
        fileName: '',
        expected: UNTITLED_FILE_NAME,
      },
      {
        name: 'the name of a File for an empty name',
        getData: () => new File([TEXT], 'notes.txt'),
        fileName: '',
        expected: 'notes.txt',
      },
    ])('names the file $name', async ({getData, fileName, expected}) => {
      vi.useFakeTimers({now, toFake: ['Date']});
      mockObjectUrls();
      const click = mockClick();

      await downloadFile(getData(), fileName);

      expect(getClickedAnchor(click).download).toBe(expected);
    });

    it.each<{name: string; getData: GetData; expected: string}>([
      {name: 'a string', getData: () => TEXT, expected: 'text/plain;charset=utf-8'},
      {name: 'bytes', getData: () => toBytes(1), expected: 'application/octet-stream'},
      {name: 'a stream', getData: () => toStream(toBytes(1)), expected: 'application/octet-stream'},
      {name: 'a Blob', getData: () => new Blob([TEXT], {type: 'text/csv'}), expected: 'text/csv'},
      {
        name: 'a response',
        getData: () => new Response(TEXT, {headers: {'Content-Type': 'text/html'}}),
        expected: 'text/html',
      },
    ])('takes the type of $name by default', async ({getData, expected}) => {
      const {createObjectURL} = mockObjectUrls();
      mockClick();

      await downloadFile(getData(), 'file');

      expect(getSavedBlob(createObjectURL).type).toBe(expected);
    });

    it.each(INPUTS)('sets the given type for $name', async ({getData}) => {
      const {createObjectURL} = mockObjectUrls();
      mockClick();

      await downloadFile(getData(), 'file', {type: 'text/csv'});

      expect(getSavedBlob(createObjectURL).type).toBe('text/csv');
    });

    it('rejects without a download when the data promise rejects', async () => {
      const {createObjectURL} = mockObjectUrls();
      const click = mockClick();
      const error = new Error('Failed to generate');

      await expect(downloadFile(Promise.reject(error), 'file')).rejects.toBe(error);

      expect(createObjectURL).not.toHaveBeenCalled();
      expect(click).not.toHaveBeenCalled();
    });

    it('rejects without a download for a response with an error status', async () => {
      mockObjectUrls();
      const click = mockClick();
      const response = new Response('Not found', {status: 404, statusText: 'Not Found'});

      const promise = downloadFile(response, 'file');

      await expect(promise).rejects.toThrow(
        new Error('Cannot download a response with status 404 Not Found'),
      );
      await expect(promise).rejects.toHaveProperty('cause', response);
      expect(click).not.toHaveBeenCalled();
    });

    it('rejects without a download for a response whose body is already read', async () => {
      mockObjectUrls();
      const click = mockClick();
      const response = new Response(TEXT);
      await response.text();

      // Browsers throw a `TypeError`, unlike happy-dom
      await expect(downloadFile(response, 'file')).rejects.toThrow();

      expect(click).not.toHaveBeenCalled();
    });

    it.each<{name: string; data: unknown; expected: string}>([
      {
        name: 'a Blob from another window',
        // Isn't an instance of this window's `Blob`, and only has its tag
        data: {[Symbol.toStringTag]: 'Blob'},
        expected: 'Cannot save Blob as a file',
      },
      {name: '`null`', data: null, expected: 'Cannot save null as a file'},
    ])(
      'rejects without a download for $name, instead of saving an empty file',
      async ({data, expected}) => {
        const {createObjectURL} = mockObjectUrls();
        const click = mockClick();

        // @ts-expect-error -- Not supported data
        await expect(downloadFile(data, 'file')).rejects.toThrow(new TypeError(expected));

        expect(createObjectURL).not.toHaveBeenCalled();
        expect(click).not.toHaveBeenCalled();
      },
    );

    it('ignores the "Save as" dialog without `picker`', async () => {
      const {showSaveFilePicker} = mockPicker();
      mockObjectUrls();
      const click = mockClick();

      await downloadFile(TEXT, 'file.txt');

      expect(showSaveFilePicker).not.toHaveBeenCalled();
      expect(click).toHaveBeenCalledOnce();
    });

    it('is used with `picker` where the "Save as" dialog is not supported', async () => {
      mockObjectUrls();
      const click = mockClick();

      await expect(downloadFile(TEXT, 'file.txt', {picker: true})).resolves.toBe(true);

      expect(click).toHaveBeenCalledOnce();
    });
  });

  describe('"Save as" dialog', () => {
    it.each(INPUTS)('saves $name', async ({getData, expected}) => {
      const {state, getWrittenBytes} = mockPicker();
      const click = mockClick();

      await expect(downloadFile(getData(), 'file', {picker: true})).resolves.toBe(true);

      expect(getWrittenBytes()).toStrictEqual(expected);
      expect(state.isClosed).toBe(true);
      expect(click).not.toHaveBeenCalled();
    });

    it('opens before the data is ready', async () => {
      const {showSaveFilePicker, getWrittenBytes} = mockPicker();
      const data = Promise.withResolvers<string>();

      const promise = downloadFile(data.promise, 'file.txt', {picker: true});

      expect(showSaveFilePicker).toHaveBeenCalledExactlyOnceWith({suggestedName: 'file.txt'});

      data.resolve(TEXT);

      await expect(promise).resolves.toBe(true);
      expect(getWrittenBytes()).toStrictEqual(encoder.encode(TEXT));
    });

    it.each<NameCase>([
      {
        name: 'the given name',
        getData: () => new File([TEXT], 'notes.txt'),
        fileName: 'renamed.txt',
        expected: 'renamed.txt',
      },
      {
        name: 'the name of a File',
        getData: () => new File([TEXT], 'notes.txt'),
        fileName: undefined,
        expected: 'notes.txt',
      },
      {
        name: '`untitled` with the date and time for a File given as a promise',
        getData: () => Promise.resolve(new File([TEXT], 'notes.txt')),
        fileName: undefined,
        expected: UNTITLED_FILE_NAME,
      },
      {
        name: '`untitled` with the date and time for an empty name',
        getData: () => TEXT,
        fileName: '',
        expected: UNTITLED_FILE_NAME,
      },
      {
        name: 'the name of a File for an empty name',
        getData: () => new File([TEXT], 'notes.txt'),
        fileName: '',
        expected: 'notes.txt',
      },
    ])('suggests $name', async ({getData, fileName, expected}) => {
      vi.useFakeTimers({now, toFake: ['Date']});
      const {showSaveFilePicker} = mockPicker();

      await downloadFile(getData(), fileName, {picker: true});

      expect(showSaveFilePicker).toHaveBeenCalledExactlyOnceWith({suggestedName: expected});
    });

    it('resolves to `false` without a download when the user closes it', async () => {
      const {createWritable} = mockPicker({pick: () => Promise.reject(createAbortError())});
      const click = mockClick();

      await expect(downloadFile(TEXT, 'file.txt', {picker: true})).resolves.toBe(false);

      expect(createWritable).not.toHaveBeenCalled();
      expect(click).not.toHaveBeenCalled();
    });

    it("doesn't report a failure of the data after the user closes it as unhandled", async () => {
      const onUnhandledRejection = trackUnhandledRejections();
      mockPicker({pick: () => Promise.reject(createAbortError())});
      const data = Promise.withResolvers<string>();

      await expect(downloadFile(data.promise, 'file.txt', {picker: true})).resolves.toBe(false);

      data.reject(new Error('Failed to generate'));
      await waitForTask();

      expect(onUnhandledRejection).not.toHaveBeenCalled();
    });

    it("doesn't report a failure of the data while it's open as unhandled when the user closes it", async () => {
      const onUnhandledRejection = trackUnhandledRejections();
      const data = Promise.withResolvers<string>();
      mockPicker({
        pick: async () => {
          data.reject(new Error('Failed to generate'));
          await waitForTask();
          throw createAbortError();
        },
      });

      await expect(downloadFile(data.promise, 'file.txt', {picker: true})).resolves.toBe(false);

      await waitForTask();

      expect(onUnhandledRejection).not.toHaveBeenCalled();
    });

    it("rejects without reporting a failure of the data while it's open as unhandled", async () => {
      const onUnhandledRejection = trackUnhandledRejections();
      const error = new Error('Failed to generate');
      const data = Promise.withResolvers<string>();
      mockPicker({
        pick: async () => {
          data.reject(error);
          await waitForTask();
        },
      });

      await expect(downloadFile(data.promise, 'file.txt', {picker: true})).rejects.toBe(error);

      await waitForTask();

      expect(onUnhandledRejection).not.toHaveBeenCalled();
    });

    it('falls back to the download link when it cannot be shown', async () => {
      const {createObjectURL} = mockObjectUrls();
      const click = mockClick();
      mockPicker({
        pick: () =>
          Promise.reject(new DOMException('Must be handling a user gesture.', 'SecurityError')),
      });

      await expect(downloadFile(TEXT, 'file.txt', {picker: true})).resolves.toBe(true);

      expect(getClickedAnchor(click).download).toBe('file.txt');
      await expect(readBytes(getSavedBlob(createObjectURL))).resolves.toStrictEqual(
        encoder.encode(TEXT),
      );
    });

    it('rejects without opening the file for writing when the data promise rejects', async () => {
      const {createWritable} = mockPicker();
      const error = new Error('Failed to generate');

      await expect(downloadFile(Promise.reject(error), 'file', {picker: true})).rejects.toBe(error);

      expect(createWritable).not.toHaveBeenCalled();
    });

    it('rejects without opening for a response with an error status', async () => {
      const {showSaveFilePicker} = mockPicker();

      await expect(
        downloadFile(new Response('Not found', {status: 404}), 'file', {picker: true}),
      ).rejects.toThrow(new Error('Cannot download a response with status 404'));

      expect(showSaveFilePicker).not.toHaveBeenCalled();
    });

    it('rejects without opening the file for writing for a promise of a response with an error status', async () => {
      const {createWritable} = mockPicker();

      await expect(
        downloadFile(Promise.resolve(new Response('Not found', {status: 404})), 'file', {
          picker: true,
        }),
      ).rejects.toThrow(new Error('Cannot download a response with status 404'));

      expect(createWritable).not.toHaveBeenCalled();
    });

    it('rejects when writing fails', async () => {
      const error = new Error('Disk is full');
      const {state} = mockPicker({
        write: () => {
          throw error;
        },
      });

      await expect(downloadFile(TEXT, 'file.txt', {picker: true})).rejects.toBe(error);

      expect(state.isClosed).toBe(false);
    });

    it('aborts writing when reading the stream fails', async () => {
      const error = new Error('Failed to generate');
      const {state} = mockPicker();
      const stream = new ReadableStream<Uint8Array>({
        start: (controller) => {
          controller.enqueue(toBytes(1));
          controller.error(error);
        },
      });

      await expect(downloadFile(stream, 'file', {picker: true})).rejects.toBe(error);

      expect(state).toStrictEqual({isClosed: false, isAborted: true});
    });
  });
});
