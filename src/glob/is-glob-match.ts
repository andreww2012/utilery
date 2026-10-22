import picomatch from 'picomatch';
import type {MaybeReadonlyArray} from '../types/maybe-readonly-array.ts';
import {type GlobOptions, toPicomatchOptions} from './_shared.ts';

/**
 * Checks whether a path matches a glob pattern (or any of several patterns).
 * See `globToRegex` for the supported syntax.
 *
 * A pattern starting with `!` is negated: it matches every path the rest of
 * the pattern does not match. To include some paths and exclude others, use
 * `createPathFilter`.
 * @param path - The path to check.
 * @param patterns - A glob pattern or a list of them.
 * @param options - `dot`, `caseInsensitive`, `windows` and `matchBasename`.
 * @returns `true` if the path matches any of the patterns, otherwise `false`.
 * @example
 * isGlobMatch('src/utils/index.ts', 'src/**\/*.ts');
 * // true
 * isGlobMatch('README.md', ['*.ts', '*.md']);
 * // true
 * @example
 * // Hidden files need `dot`
 * isGlobMatch('.env', '*');
 * // false
 * isGlobMatch('.env', '*', {dot: true});
 * // true
 */
export const isGlobMatch = (
  path: string,
  patterns: MaybeReadonlyArray<string>,
  options?: GlobOptions,
) =>
  picomatch.isMatch(
    path,
    typeof patterns === 'string' ? patterns : [...patterns],
    toPicomatchOptions(options),
  );
