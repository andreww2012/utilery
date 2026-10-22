import {findUp as findUpBase, findUpSync as findUpSyncBase} from 'find-up-simple';

export type {Options as FindUpOptions} from 'find-up-simple';

/**
 * Finds a file or directory by name, looking in the starting directory first
 * and then in each parent directory, like Node.js does for `package.json`.
 *
 * Only an entry of the requested `type` counts: by default, a directory with
 * the given name is skipped and the search goes on. An absolute `name` is
 * checked as is.
 * @param name - The name (or relative path) of the file or directory to find.
 * @param options - `cwd`: where to start; `type`: `'file'` (default) or `'directory'`; `stopAt`: the last directory to check.
 * @returns The absolute path of the first match, or `undefined` if nothing was found.
 * @example
 * // /repo/package.json exists, the search starts in /repo/src/utils
 * await findUp('package.json', {cwd: '/repo/src/utils'});
 * // '/repo/package.json'
 * @example
 * // Find a directory, not looking above the repository
 * await findUp('node_modules', {type: 'directory', stopAt: repoRoot});
 */
// eslint-disable-next-line unicorn/prefer-export-from -- re-declared to attach rewritten JSDoc; an `export…from` would inherit the upstream docs
export const findUp = findUpBase;

/**
 * Synchronous version of `findUp`.
 * @param name - The name (or relative path) of the file or directory to find.
 * @param options - `cwd`: where to start; `type`: `'file'` (default) or `'directory'`; `stopAt`: the last directory to check.
 * @returns The absolute path of the first match, or `undefined` if nothing was found.
 * @example
 * findUpSync('package.json', {cwd: '/repo/src/utils'});
 * // '/repo/package.json'
 */
// eslint-disable-next-line unicorn/prefer-export-from -- re-declared to attach rewritten JSDoc; an `export…from` would inherit the upstream docs
export const findUpSync = findUpSyncBase;
