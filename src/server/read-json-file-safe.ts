import {jsonParse} from '../json/json-parse.ts';
import {readFileSafe} from './read-file-safe.ts';

const BYTE_ORDER_MARK = '\u{FEFF}'; // cspell:disable-line

/**
 * Reads and parses a JSON file, returning `null` instead of throwing when the
 * file does not exist, like `readFileSafe`.
 * A leading byte order mark, which some editors add, is ignored.
 *
 * Parsing is strict, as in `jsonParse`: invalid JSON throws a `SyntaxError`,
 * whose message includes the file path, and keys that could trigger prototype
 * pollution throw an `Error`.
 * Other errors while reading the file (permission denied, the path being a
 * directory, etc.) are rethrown as well.
 * @param filePath - Path to the JSON file.
 * @returns The parsed value, typed as the `T` type argument (`unknown` by default; a purely
 * type-level assertion), or `null` if the file does not exist.
 * @throws {SyntaxError | Error} A `SyntaxError` for invalid JSON, or an `Error` on suspected
 * prototype pollution or when the file cannot be read.
 * @example
 * // Read a config file that may be missing
 * const config = await readJsonFileSafe('config.json');
 * if (config == null) {
 *   // file does not exist
 * }
 * @example
 * // Assert the shape of the contents
 * const packageJson = await readJsonFileSafe<{version?: string}>('package.json');
 * // {version?: string} | null
 */
export const readJsonFileSafe = async <T = unknown>(filePath: string): Promise<T | null> => {
  const contents = await readFileSafe(filePath);
  if (contents == null) {
    return null;
  }

  try {
    return jsonParse<T>(contents.startsWith(BYTE_ORDER_MARK) ? contents.slice(1) : contents);
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new SyntaxError(`${filePath}: ${error.message}`, {cause: error});
    }

    throw error;
  }
};
