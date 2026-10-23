import fs from 'node:fs/promises';
import {isNodeError} from './is-node-error.ts';

/**
 * Reads a file, returning `null` instead of throwing when the file does not
 * exist (`ENOENT`).
 * Any other error (permission denied, the path being a directory, etc.) is
 * rethrown, so genuine failures are never silently swallowed.
 * Defaults to decoding the contents as UTF-8 text; pass `asBinary` as `true` to
 * receive the raw `Buffer`.
 * @param filePath - Path to the file to read.
 * @param asBinary - When `true`, resolves to a raw `Buffer`; otherwise to a UTF-8 string.
 * Defaults to `false`.
 * @returns The file contents (`string` or `Buffer`), or `null` if the file does not exist.
 * @example
 * // Read text, tolerating a missing file
 * const config = await readFileSafe('config.json');
 * if (config == null) {
 *   // file does not exist
 * }
 * @example
 * // Read raw bytes
 * const bytes = await readFileSafe('logo.png', true);
 * // Buffer | null
 */
// eslint-disable-next-line unicorn/consistent-boolean-name
export function readFileSafe(filePath: string, asBinary?: false): Promise<string | null>;
// eslint-disable-next-line unicorn/consistent-boolean-name
export function readFileSafe(filePath: string, asBinary: true): Promise<Buffer | null>;
export async function readFileSafe(
  filePath: string,
  // eslint-disable-next-line unicorn/consistent-boolean-name
  asBinary = false,
): Promise<string | Buffer | null> {
  return await fs.readFile(filePath, asBinary ? null : 'utf8').catch((error: unknown) => {
    if (isNodeError(error, 'ENOENT')) {
      return null;
    }

    throw error;
  });
}
