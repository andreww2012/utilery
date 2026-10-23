import {findLastKey} from 'es-toolkit/compat';
import {findKey} from 'es-toolkit/object';

/**
 * Returns the key of the first property whose value satisfies `predicate`, the
 * object analog of `Array.prototype.find`, returning the key instead of the
 * value.
 * Returns `undefined` when no property matches.
 *
 * Pass `true` as the third argument to scan from the last key to the first.
 * @param object - The object to search.
 * @param predicate - Invoked as `(value, key, object)`; the first key for which
 * it returns `true` is returned.
 * @param isFromRight - When `true`, scans keys from last to first.
 * Defaults to `false`.
 * @returns The matching key, or `undefined` if none matches.
 * @example
 * // First key whose value passes the predicate
 * findObjectKey({a: 1, b: 2, c: 3}, (value) => value > 1);
 * // 'b'
 * @example
 * // Scanning from the end
 * findObjectKey({a: 1, b: 2, c: 3}, (value) => value > 1, true);
 * // 'c'
 * @example
 * // No match
 * findObjectKey({a: 1}, (value) => value > 5);
 * // undefined
 */
export const findObjectKey = <T extends Record<PropertyKey, unknown>>(
  object: T,
  predicate: (value: T[keyof T], key: keyof T, object: T) => boolean,
  isFromRight?: boolean,
): keyof T | undefined => {
  return isFromRight ? findLastKey(object, predicate) : findKey(object, predicate);
};
