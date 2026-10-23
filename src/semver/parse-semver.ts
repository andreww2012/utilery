import {type SemVer, tryParse} from 'verkit';

/** A semantic version split into its parts, as returned by `parseSemver` */
export type ParsedSemver = SemVer;

/**
 * Parses a semantic version string into its parts.
 * A leading `v` and surrounding whitespace are allowed; build metadata (after
 * `+`) is split by dots, and numeric prerelease identifiers become numbers.
 *
 * Returns `undefined` for an invalid version, including incomplete ones like
 * `'1.2'`.
 * Pass `{loose: true}` to also accept common mistakes, like a leading `=` or a
 * missing `-` before the prerelease (`'1.2.3beta'`).
 * @param version - The version string to parse.
 * @param options - Options.
 * @param options.loose - Accept common syntax mistakes (defaults to `false`).
 * @returns The version parts, or `undefined` if the version is invalid.
 * @example
 * parseSemver('1.2.3-rc.1+sha.abc');
 * // {major: 1, minor: 2, patch: 3, prerelease: ['rc', 1], build: ['sha', 'abc']}
 * parseSemver('v2.0.0');
 * // {major: 2, minor: 0, patch: 0}
 * @example
 * parseSemver('1.2');
 * // undefined
 */
export const parseSemver = (version: string, options?: {loose?: boolean}): SemVer | undefined =>
  tryParse(version, options) || undefined;
