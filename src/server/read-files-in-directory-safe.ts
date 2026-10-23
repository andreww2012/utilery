import fs from 'node:fs/promises';
import nodePath from 'node:path';
import {arrayify} from '../array/arrayify.ts';
import {sortBy} from '../array/sort-by.ts';
import {withConcurrencyLimit} from '../async/with-concurrency-limit.ts';
import {ensurePrefix} from '../string/ensure-prefix.ts';
import type {MaybeReadonlyArray} from '../types/maybe-readonly-array.ts';
import {isNodeError} from './is-node-error.ts';
import {readFileSafe} from './read-file-safe.ts';

// Reading every file at once can run out of file descriptors in large directories
const MAX_CONCURRENT_READS = 32;

interface ReadFilesInDirectoryOptions {
  /**
   * When `true`, files in nested directories are read too.
   * Defaults to `false`
   */
  recursive?: boolean;

  /**
   * Only reads the files whose names end with one of these extensions, compared
   * case-sensitively.
   * The leading dot is optional, and multi-part extensions like `'.d.ts'` work
   */
  extensions?: MaybeReadonlyArray<string>;

  /**
   * Only reads the files for which it returns `true`.
   * Receives the path of the file relative to the directory, with forward
   * slashes
   */
  filter?: (relativePath: string) => boolean;
}

interface DirectoryFile<Contents> {
  /** The path to the file: the directory path joined with the relative path */
  path: string;

  /** The path relative to the directory, with forward slashes on every platform */
  relativePath: string;

  contents: Contents;
}

/**
 * Reads all files in a directory, returning `null` instead of throwing when the
 * directory does not exist, like `readFileSafe` does for a file.
 * Any other error (permission denied, the path being a file, etc.) is rethrown.
 *
 * Only regular files are read: subdirectories (unless `recursive` is set) and
 * symbolic links are skipped.
 * The files are sorted by their relative paths, so the order is the same on
 * every platform.
 * Defaults to decoding the contents as UTF-8 text; pass `asBinary: true` to
 * receive raw `Buffer`s.
 * @param directoryPath - Path to the directory.
 * @param options - Which files to read and how.
 * @param options.asBinary When `true`, the contents are raw `Buffer`s; otherwise UTF-8 strings.
 * Defaults to `false`.
 * @returns The files with their paths and contents, or `null` if the directory does not exist.
 * @example
 * // All Markdown files, including nested ones
 * const posts = await readFilesInDirectorySafe('content/posts', {
 *   recursive: true,
 *   extensions: ['md', 'mdx'],
 * });
 * // [{path: 'content/posts/2024/hello.md', relativePath: '2024/hello.md', contents: '# Hello'}, ...]
 * @example
 * // Treat a missing directory as empty
 * const fixtures = (await readFilesInDirectorySafe('fixtures')) || [];
 * @example
 * // Custom filter and raw bytes
 * const images = await readFilesInDirectorySafe('assets', {
 *   filter: (relativePath) => !relativePath.startsWith('drafts/'),
 *   asBinary: true,
 *   recursive: true,
 * });
 */
export function readFilesInDirectorySafe(
  directoryPath: string,
  options?: ReadFilesInDirectoryOptions & {asBinary?: false},
): Promise<DirectoryFile<string>[] | null>;
export function readFilesInDirectorySafe(
  directoryPath: string,
  options: ReadFilesInDirectoryOptions & {asBinary: true},
): Promise<DirectoryFile<Buffer>[] | null>;
export async function readFilesInDirectorySafe(
  directoryPath: string,
  options: ReadFilesInDirectoryOptions & {asBinary?: boolean} = {},
): Promise<DirectoryFile<string | Buffer>[] | null> {
  const {recursive = false, extensions, filter, asBinary = false} = options;

  const entries = await fs
    .readdir(directoryPath, {withFileTypes: true, recursive})
    .catch((error: unknown) => {
      if (isNodeError(error, 'ENOENT')) {
        return null;
      }

      throw error;
    });
  if (entries == null) {
    return null;
  }

  const suffixes = arrayify(extensions).map((extension) => ensurePrefix(extension, '.'));
  const files = entries
    .filter((entry) => entry.isFile())
    .map((entry) => {
      const path = nodePath.join(entry.parentPath, entry.name);
      return {
        path,
        relativePath: nodePath.relative(directoryPath, path).split(nodePath.sep).join('/'),
      };
    })
    .filter(
      ({relativePath}) =>
        (suffixes.length === 0 || suffixes.some((suffix) => relativePath.endsWith(suffix))) &&
        (!filter || filter(relativePath)),
    );

  const readFile = withConcurrencyLimit(async (file: (typeof files)[number]) => {
    const contents = asBinary ? await readFileSafe(file.path, true) : await readFileSafe(file.path);
    return contents == null ? null : {...file, contents};
  }, MAX_CONCURRENT_READS);

  // A file deleted after the directory was listed is skipped
  const filesWithContents = await Promise.all(files.map(async (file) => await readFile(file)));
  return sortBy(
    filesWithContents.filter((file) => file != null),
    [(file) => file.relativePath],
  );
}
