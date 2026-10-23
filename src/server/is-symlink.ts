import {isSymlink as isSymlinkBase, isSymlinkSync as isSymlinkSyncBase} from 'path-type';
import {falseIfMissingSync, returnFalseIfMissing} from './_shared.ts';

/**
 * Checks whether the path points to a symbolic link.
 * The link itself is checked, not its target, so a broken link gives `true`
 * too.
 *
 * A missing path (or one going through a file, like `file.txt/child`) gives
 * `false`.
 * Any other error, like permission denied, is rethrown.
 * @param path - The path to check.
 * @returns `true` if the path is a symbolic link, otherwise `false`.
 * @example
 * await isSymlink('node_modules/.bin/vitest');
 * // true
 * await isSymlink('package.json');
 * // false
 */
export const isSymlink = async (path: string) =>
  await isSymlinkBase(path).catch(returnFalseIfMissing);

/**
 * Synchronous version of `isSymlink`.
 * @param path - The path to check.
 * @returns `true` if the path is a symbolic link, otherwise `false`.
 * @example
 * isSymlinkSync('node_modules/.bin/vitest');
 * // true
 */
export const isSymlinkSync = (path: string) => falseIfMissingSync(() => isSymlinkSyncBase(path));
