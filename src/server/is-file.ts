import {isFile as isFileBase, isFileSync as isFileSyncBase} from 'path-type';
import {falseIfMissingSync, returnFalseIfMissing} from './_shared.ts';

/**
 * Checks whether the path points to a file.
 * Symbolic links are followed: a link to a file gives `true`.
 *
 * A missing path (or one going through a file, like `file.txt/child`) gives
 * `false`.
 * Any other error, like permission denied, is rethrown.
 * @param path - The path to check.
 * @returns `true` if the path is a file, otherwise `false`.
 * @example
 * await isFile('package.json');
 * // true
 * await isFile('src');
 * // false
 */
export const isFile = async (path: string): Promise<boolean> =>
  await isFileBase(path).catch(returnFalseIfMissing);

/**
 * Synchronous version of `isFile`.
 * @param path - The path to check.
 * @returns `true` if the path is a file, otherwise `false`.
 * @example
 * isFileSync('package.json');
 * // true
 */
export const isFileSync = (path: string): boolean => falseIfMissingSync(() => isFileSyncBase(path));
