import {ensurePrefix as baseEnsurePrefix} from '@antfu/utils';

/**
 * Ensures `value` begins with `prefix`, prepending it only when it is not
 * already present.
 * When `value` already starts with `prefix`, it is returned unchanged.
 * The argument order puts the subject string first, mirroring native `String`
 * methods like `startsWith`/`padStart`.
 * @param value - The string to ensure the prefix on.
 * @param prefix - The prefix that `value` should start with.
 * @returns `value` unchanged when it already starts with `prefix`, otherwise
 * `prefix + value`.
 * @example
 * // Adds the prefix when missing
 * ensurePrefix('user-1', '/');
 * // '/user-1'
 * @example
 * // Leaves the string untouched when the prefix is already there
 * ensurePrefix('/user-1', '/');
 * // '/user-1'
 */
export const ensurePrefix = (value: string, prefix: string): string =>
  baseEnsurePrefix(prefix, value);
