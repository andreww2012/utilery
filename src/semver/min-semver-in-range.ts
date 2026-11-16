import {findMinimumForRange} from 'verkit';
import type {ParsedSemver} from './parse-semver.ts';

/**
 * Finds the lowest version that satisfies an npm-style version range.
 * It doesn't have to be a published version: for `>1.2.3` it is `1.2.4`.
 *
 * It is a prerelease only when the range starts at one (`>=1.0.0-rc.1`, or
 * `>1.0.0-rc.1`, which gives `1.0.0-rc.1.0`) or with
 * `{includePrerelease: true}`.
 * Throws a `TypeError` for an invalid range.
 * @param range - The range to search.
 * @param options - Options.
 * @param options.includePrerelease - Let prereleases match any range (defaults to `false`).
 * @param options.loose - Accept common syntax mistakes, like a leading `=` (defaults to `false`).
 * @returns The parts of the lowest version, or `undefined` if no version can satisfy the range.
 * @example
 * minSemverInRange('^1.2');
 * // {major: 1, minor: 2, patch: 0}
 * minSemverInRange('>1.2.3');
 * // {major: 1, minor: 2, patch: 4}
 * minSemverInRange('^2 || ~1.4');
 * // {major: 1, minor: 4, patch: 0}
 * minSemverInRange('*');
 * // {major: 0, minor: 0, patch: 0}
 * @example
 * minSemverInRange('>2 <1');
 * // undefined
 */
export const minSemverInRange = (
  range: string,
  options?: {includePrerelease?: boolean; loose?: boolean},
): ParsedSemver | undefined => findMinimumForRange(range, options) || undefined;
