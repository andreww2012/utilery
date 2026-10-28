import {type Options, findUp as findUpBase, findUpSync as findUpSyncBase} from 'find-up-simple';

/** Options of `findUp` and `findUpSync` */
export type FindUpOptions = Options;

/**
 * Finds a file or directory by name, looking in the starting directory first and then in each
 * parent directory, like Node.js does for `package.json`
 */
export const findUp: {
  /**
   * Finds a file or directory by name, looking in the starting directory first
   * and then in each parent directory, like Node.js does for `package.json`.
   *
   * Only an entry of the requested `type` counts: by default, a directory with
   * the given name is skipped and the search goes on.
   * An absolute `name` is checked as is.
   * @param name - The name (or relative path) of the file or directory to find.
   * @param options - `cwd`: where to start; `type`: `'file'` (default) or `'directory'`; `stopAt`:
   * the last directory to check.
   * @returns The absolute path of the first match, or `undefined` if nothing was found.
   * @example
   * // /repo/package.json exists, the search starts in /repo/src/utils
   * await findUp('package.json', {cwd: '/repo/src/utils'});
   * // '/repo/package.json'
   * @example
   * // Find a directory, not looking above the repository
   * await findUp('node_modules', {type: 'directory', stopAt: repoRoot});
   */
  (name: string, options?: FindUpOptions): Promise<string | undefined>;
} = findUpBase;

/** Synchronous version of `findUp` */
export const findUpSync: {
  /**
   * Synchronous version of `findUp`.
   * @param name - The name (or relative path) of the file or directory to find.
   * @param options - `cwd`: where to start; `type`: `'file'` (default) or `'directory'`; `stopAt`:
   * the last directory to check.
   * @returns The absolute path of the first match, or `undefined` if nothing was found.
   * @example
   * findUpSync('package.json', {cwd: '/repo/src/utils'});
   * // '/repo/package.json'
   */
  (name: string, options?: FindUpOptions): string | undefined;
} = findUpSyncBase;
