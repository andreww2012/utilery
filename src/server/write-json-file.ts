import {
  writeJsonFile as writeJsonFileBase,
  writeJsonFileSync as writeJsonFileSyncBase,
} from 'write-json-file';

/** Options of `writeJsonFile` and `writeJsonFileSync` */
export interface WriteJsonFileOptions {
  /**
   * Indentation as a string or a number of spaces; `undefined` for none.
   * Defaults to `2`
   */
  indent?: string | number;

  /**
   * Keeps the indentation of the existing file, if there is one; `indent` is
   * used otherwise.
   * Defaults to `true`
   */
  detectIndent?: boolean;

  /**
   * Sorts object keys recursively, optionally with a compare function.
   * Defaults to `false`
   */
  sortKeys?: boolean | ((left: string, right: string) => number);
  /** Passed to `JSON.stringify` */
  replacer?:
    | ((this: unknown, key: string, value: unknown) => unknown)
    | readonly (number | string)[];

  /**
   * File mode of a new file.
   * Defaults to `0o666` (before the umask is applied)
   */
  mode?: number;
}

const DEFAULT_OPTIONS: Readonly<WriteJsonFileOptions> = {indent: 2, detectIndent: true};

/**
 * Serializes a value as JSON and writes it to a file atomically: the data is
 * written to a temporary file first, which then replaces the target, so a crash
 * never leaves a half-written file behind.
 * Missing parent directories are created.
 *
 * By default, the indentation of an existing file is kept (2 spaces for a new
 * one), and a trailing newline is added unless the existing file has none.
 * Throws a `TypeError` for `undefined` data.
 * @param filePath - Path to the JSON file.
 * @param data - The value to write.
 * @param options - `indent`, `detectIndent`, `sortKeys`, `replacer` and `mode`.
 * @returns A promise that resolves once the file is written.
 * @example
 * await writeJsonFile('config.json', {port: 3000});
 * // config.json: '{\n  "port": 3000\n}\n'
 * @example
 * // Update package.json, keeping its style
 * const packageJson = await readJsonFileSafe<PackageJson>('package.json');
 * await writeJsonFile('package.json', {...packageJson, version: '2.0.0'});
 * @example
 * // Stable output for diffs
 * await writeJsonFile('lock.json', data, {sortKeys: true});
 */
export const writeJsonFile = async (
  filePath: string,
  data: unknown,
  options?: WriteJsonFileOptions,
) => {
  await writeJsonFileBase(filePath, data, {...DEFAULT_OPTIONS, ...options});
};

/**
 * Synchronous version of `writeJsonFile`.
 * @param filePath - Path to the JSON file.
 * @param data - The value to write.
 * @param options - `indent`, `detectIndent`, `sortKeys`, `replacer` and `mode`.
 * @example
 * writeJsonFileSync('config.json', {port: 3000});
 */
export const writeJsonFileSync = (
  filePath: string,
  data: unknown,
  options?: WriteJsonFileOptions,
) => {
  writeJsonFileSyncBase(filePath, data, {...DEFAULT_OPTIONS, ...options});
};
