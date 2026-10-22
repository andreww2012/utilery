import picomatch from 'picomatch';
import {arrayify} from '../array/arrayify.ts';
import {toForwardSlashes} from '../path/to-forward-slashes.ts';
import type {MaybeReadonlyArray} from '../types/maybe-readonly-array.ts';
import type {OmitStrict} from '../types/omit-strict.ts';
import {type GlobOptions, toPicomatchOptions} from './_shared.ts';

/** Patterns of `createPathFilter`: glob strings or regular expressions */
type PathPatterns = MaybeReadonlyArray<string | RegExp>;

const toMatcher = (pattern: string | RegExp, options?: GlobOptions) => {
  if (typeof pattern === 'string') {
    return picomatch(pattern, toPicomatchOptions(options));
  }

  return (path: string) => {
    // A global or sticky regex keeps its position between calls, which would skip matches
    pattern.lastIndex = 0;
    return pattern.test(path);
  };
};

/**
 * Creates a function that checks whether a path passes include and exclude
 * patterns, like the `include`/`exclude` options of build tools. Patterns are
 * globs (see `globToRegex`) or regular expressions.
 *
 * A path passes when it matches no `exclude` pattern, and any `include`
 * pattern (all paths are included when there are none). Backslashes in paths
 * are turned into `/` before matching, so Windows paths work with `/` globs.
 * @param patterns - The patterns: globs or regular expressions.
 * @param patterns.include - Paths to keep: a pattern or a list of them (all paths when missing).
 * @param patterns.exclude - Paths to drop: a pattern or a list of them.
 * @param options - `dot`, `caseInsensitive` and `matchBasename` for the glob patterns.
 * @returns A function returning `true` for paths that pass the filter.
 * @example
 * const filter = createPathFilter({include: ['src/**'], exclude: [/\.test\.ts$/, '**\/fixtures/**']});
 * filter('src/index.ts');
 * // true
 * filter('src/index.test.ts');
 * // false
 * filter('docs/readme.md');
 * // false
 * @example
 * // Only exclusions
 * const notInNodeModules = createPathFilter({exclude: '**\/node_modules/**'});
 * files.filter(notInNodeModules);
 */
export const createPathFilter = (
  patterns: {include?: PathPatterns; exclude?: PathPatterns},
  options?: OmitStrict<GlobOptions, 'windows'>,
) => {
  const includeMatchers = arrayify(patterns.include).map((pattern) => toMatcher(pattern, options));
  const excludeMatchers = arrayify(patterns.exclude).map((pattern) => toMatcher(pattern, options));

  return (path: string) => {
    const normalizedPath = toForwardSlashes(path);
    return (
      excludeMatchers.every((matches) => !matches(normalizedPath)) &&
      (includeMatchers.length === 0 || includeMatchers.some((matches) => matches(normalizedPath)))
    );
  };
};
