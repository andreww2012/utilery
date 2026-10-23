import {isDirectory as isDirectoryBase, isDirectorySync as isDirectorySyncBase} from 'path-type';
import {falseIfMissingSync, returnFalseIfMissing} from './_shared.ts';

/**
 * Checks whether the path points to a directory.
 * Symbolic links are followed: a link to a directory gives `true`.
 *
 * A missing path (or one going through a file, like `file.txt/child`) gives
 * `false`.
 * Any other error, like permission denied, is rethrown.
 * @param path - The path to check.
 * @returns `true` if the path is a directory, otherwise `false`.
 * @example
 * await isDirectory('src');
 * // true
 * await isDirectory('package.json');
 * // false
 */
export const isDirectory = async (path: string) =>
  await isDirectoryBase(path).catch(returnFalseIfMissing);

/**
 * Synchronous version of `isDirectory`.
 * @param path - The path to check.
 * @returns `true` if the path is a directory, otherwise `false`.
 * @example
 * isDirectorySync('src');
 * // true
 */
export const isDirectorySync = (path: string) =>
  falseIfMissingSync(() => isDirectorySyncBase(path));
