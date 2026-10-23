// cspell:ignore nothrow PATHEXT
import which from 'which';
import type {MaybeReadonlyArray} from '../types/maybe-readonly-array.ts';

/** Options of `findExecutable` and `findExecutableSync` */
export interface FindExecutableOptions {
  /**
   * Directories to search, joined like the `PATH` variable.
   * Defaults to `process.env.PATH`
   */
  path?: string;

  /**
   * Executable extensions to try on Windows, joined like `PATHEXT`.
   * Defaults to `process.env.PATHEXT`
   */
  pathExt?: string;
}

/**
 * Finds the path of an executable the way a shell does: by looking through the
 * directories of the `PATH` environment variable, like the `which` command.
 * On Windows, also tries the extensions from `PATHEXT` (`.exe`, `.cmd`, etc.)
 * and the current directory first.
 *
 * A command containing a slash is checked as is, without searching.
 * Pass `{all: true}` to get every match in `PATH` order instead of the first
 * one.
 * @param command - The name of the executable, like `'git'`.
 * @param options - `all`: return every match; `path` and `pathExt`: override the environment
 * variables.
 * @returns The path of the executable, or `undefined` if it was not found (an array of paths with
 * `all`, empty if none).
 * @example
 * await findExecutable('node');
 * // '/usr/local/bin/node'
 * await findExecutable('not-installed');
 * // undefined
 * @example
 * // Every match
 * await findExecutable('python', {all: true});
 * // ['/usr/local/bin/python', '/usr/bin/python']
 */
export async function findExecutable(
  command: string,
  options: FindExecutableOptions & {all: true},
): Promise<string[]>;
export async function findExecutable(
  command: string,
  options?: FindExecutableOptions & {all?: false},
): Promise<string | undefined>;
export async function findExecutable(
  command: string,
  options: FindExecutableOptions & {all?: boolean} = {},
): Promise<MaybeReadonlyArray<string> | undefined> {
  const result = await which(command, {...options, all: options.all, nothrow: true});
  return result || (options.all ? [] : undefined);
}

/**
 * Synchronous version of `findExecutable`.
 * @param command - The name of the executable, like `'git'`.
 * @param options - `all`: return every match; `path` and `pathExt`: override the environment
 * variables.
 * @returns The path of the executable, or `undefined` if it was not found (an array of paths with
 * `all`, empty if none).
 * @example
 * findExecutableSync('git');
 * // '/usr/bin/git'
 */
export function findExecutableSync(
  command: string,
  options: FindExecutableOptions & {all: true},
): string[];
export function findExecutableSync(
  command: string,
  options?: FindExecutableOptions & {all?: false},
): string | undefined;
export function findExecutableSync(
  command: string,
  options: FindExecutableOptions & {all?: boolean} = {},
): MaybeReadonlyArray<string> | undefined {
  const result = which.sync(command, {...options, all: options.all, nothrow: true});
  return result || (options.all ? [] : undefined);
}
