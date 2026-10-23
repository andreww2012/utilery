import leven from 'leven';

/**
 * Measures how different two strings are: the Levenshtein distance, the
 * smallest number of single-character insertions, deletions and replacements
 * that turn one string into the other.
 * Comparison is case-sensitive and works on UTF-16 code units.
 *
 * Pass `maxDistance` when only small distances matter (like for typo
 * suggestions): the calculation stops early, and any larger distance is
 * returned as `maxDistance`.
 * @param first - The first string.
 * @param second - The second string.
 * @param options - Options.
 * @param options.maxDistance - The largest distance to calculate; larger distances are returned as
 * it.
 * @returns The distance (`0` for equal strings), at most `maxDistance` if given.
 * @example
 * levenshteinDistance('kitten', 'sitting');
 * // 3
 * levenshteinDistance('cat', 'cat');
 * // 0
 * @example
 * levenshteinDistance('abcdef', '123456', {maxDistance: 3});
 * // 3
 */
// eslint-disable-next-line unicorn/prefer-export-from -- re-declared to attach rewritten JSDoc; an `export ... from` would inherit the upstream docs
export const levenshteinDistance = leven;
