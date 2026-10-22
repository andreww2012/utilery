import picomatch from 'picomatch';
import {type GlobOptions, toPicomatchOptions} from './_shared.ts';

/**
 * Converts a glob pattern into a regular expression matching whole paths, for
 * use where a `RegExp` is expected. Supports `*` (any characters within a
 * path segment), `**` (any number of segments), `?`, character classes
 * (`[a-z]`), braces (`{js,ts}`, `{1..3}`) and extended globs (`+(a|b)`,
 * `!(a)`).
 *
 * Paths use `/` as the separator; pass `{windows: true}` to also accept `\`.
 * By default, wildcards don't match names starting with a dot; pass
 * `{dot: true}` to match them.
 * @param pattern - The glob pattern.
 * @param options - `dot`, `caseInsensitive`, `windows` and `matchBasename`.
 * @returns A regular expression matching the paths the pattern matches.
 * @example
 * const regex = globToRegex('src/**\/*.{js,ts}');
 * regex.test('src/utils/index.ts');
 * // true
 * regex.test('test/index.ts');
 * // false
 * @example
 * globToRegex('*.md', {caseInsensitive: true}).test('README.MD');
 * // true
 */
export const globToRegex = (pattern: string, options?: GlobOptions) =>
  picomatch.makeRe(pattern, toPicomatchOptions(options));
