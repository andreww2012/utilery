import {isValid} from 'verkit';
import type {ParsedSemver} from './parse-semver.ts';

/** Checks whether a string is a valid semantic version */
export const isValidSemver: {
  /**
   * Checks whether a string is a valid semantic version (`major.minor.patch` with
   * optional prerelease and build parts).
   * A leading `v` and surrounding whitespace are allowed; incomplete versions
   * like `'1.2'` and ranges are not.
   * @param version - The string to check.
   * @param options - Options.
   * @param options.loose - Accept common syntax mistakes, like a leading `=` (defaults to `false`).
   * @returns `true` if the string is a valid version, otherwise `false`.
   * @example
   * isValidSemver('1.2.3-rc.1+build');
   * // true
   * isValidSemver('v1.2.3');
   * // true
   * @example
   * isValidSemver('1.2');
   * // false
   * isValidSemver('^1.2.3');
   * // false
   */
  (version: ParsedSemver | string, options?: {loose?: boolean}): boolean;
} = isValid;
