import fs from 'node:fs/promises';
import {returnFalseIfMissing} from './_shared.ts';

/**
 * Checks whether a file or directory exists at the given path.
 *
 * A missing path (or one going through a file, like `file.txt/child`) gives
 * `false`. Any other error, like permission denied, is rethrown, so genuine
 * failures are never mistaken for a missing path. Symbolic links are followed:
 * a link to a missing target gives `false`.
 *
 * To read a file that may be missing, use `readFileSafe` instead of checking
 * first: the file could be deleted between the check and the read.
 * @param path - The path to check.
 * @returns `true` if something exists at the path, otherwise `false`.
 * @example
 * await pathExists('package.json');
 * // true
 * await pathExists('does-not-exist');
 * // false
 */
// eslint-disable-next-line unicorn/consistent-boolean-name -- the well-known name of this check, as in `fs-extra`
export const pathExists = async (path: string) =>
  await fs
    .access(path)
    .then(() => true)
    .catch(returnFalseIfMissing);
