import {compare} from 'verkit';

/**
 * Compares two semantic versions by the rules of the SemVer spec, as npm does:
 * a prerelease is lower than its release (`3.0.0-rc.1` < `3.0.0`), numeric
 * prerelease identifiers are compared as numbers (`rc.2` < `rc.10`), and build
 * metadata is ignored.
 * Fits `Array#sort` as a comparator.
 *
 * A leading `v` and surrounding whitespace are allowed.
 * Throws a `TypeError` for an invalid version, including incomplete ones like
 * `'1.2'`; pass `{loose: true}` to also accept common mistakes, like a leading
 * `=`.
 * @param left - The first version (a string or the result of `parseSemver`).
 * @param right - The second version (a string or the result of `parseSemver`).
 * @param options - Options.
 * @param options.loose - Accept common syntax mistakes, like a leading `=` (defaults to `false`).
 * @returns `-1` if `left` is lower, `1` if it is higher, `0` if they are equal.
 * @example
 * compareSemver('1.2.3', '1.10.0');
 * // -1
 * compareSemver('3.0.0', '3.0.0-rc.1');
 * // 1
 * compareSemver('v1.2.3', '1.2.3+build');
 * // 0
 * @example
 * // Sort versions
 * ['1.10.0', '1.2.0', '1.2.0-beta'].sort(compareSemver);
 * // ['1.2.0-beta', '1.2.0', '1.10.0']
 */
// eslint-disable-next-line unicorn/prefer-export-from -- re-declared to attach rewritten JSDoc; an `export ... from` would inherit the upstream docs
export const compareSemver = compare;
