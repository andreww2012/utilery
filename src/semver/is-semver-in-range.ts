import {satisfies} from 'verkit';

/**
 * Checks whether a semantic version satisfies an npm-style version range:
 * comparators (`>=1.2.0 <2`), unions (`^1 || ^2`), hyphen ranges
 * (`1.0.0 - 2.0.0`), wildcards (`1.x`), tilde and caret ranges.
 *
 * As in npm, prereleases only match a range that names a prerelease of the
 * same `major.minor.patch` (`3.0.0-rc.1` does not satisfy `>=2`); pass
 * `{includePrerelease: true}` to match them like any other version. An invalid
 * version or range gives `false`.
 * @param version - The version to check (a string or the result of `parseSemver`).
 * @param range - The range to check against.
 * @param options - Options.
 * @param options.includePrerelease - Let prereleases match any range (defaults to `false`).
 * @param options.loose - Accept common syntax mistakes, like a leading `=` (defaults to `false`).
 * @returns `true` if the version is in the range, otherwise `false`.
 * @example
 * isSemverInRange('1.5.0', '^1.2.0');
 * // true
 * isSemverInRange('2.0.0', '^1.2.0');
 * // false
 * isSemverInRange('1.4.2', '1.x || >=3');
 * // true
 * @example
 * // Prereleases
 * isSemverInRange('3.0.0-rc.1', '>=2');
 * // false
 * isSemverInRange('3.0.0-rc.1', '>=2', {includePrerelease: true});
 * // true
 */
// eslint-disable-next-line unicorn/prefer-export-from -- re-declared to attach rewritten JSDoc; an `export…from` would inherit the upstream docs
export const isSemverInRange = satisfies;
