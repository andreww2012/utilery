import {invert, invertBy} from 'es-toolkit/compat';

/**
 * Swaps an object's keys and values, returning a new object keyed by the
 * original values.
 * When several keys share a value, the last one wins.
 *
 * Pass a `groupValueBy` iteratee to instead group every original key under its
 * (optionally transformed) value: each entry becomes an **array** of the keys
 * that mapped to it, so nothing is lost on collisions.
 * @param object - The source object.
 * Not mutated.
 * @param groupValueBy - Optional iteratee `(value) => key` deriving the grouping
 * key for each value; when provided, the result groups keys into arrays.
 * @returns A new object keyed by the original values.
 * @example
 * // Swap keys and values
 * swapObjectKeysValues({a: 'x', b: 'y'});
 * // {x: 'a', y: 'b'}
 * @example
 * // Colliding values: last key wins
 * swapObjectKeysValues({a: '1', b: '1'});
 * // {1: 'b'}
 * @example
 * // With an iteratee: group colliding keys into arrays
 * swapObjectKeysValues({a: 1, b: 2, c: 1}, (value) => `n${value}`);
 * // {n1: ['a', 'c'], n2: ['b']}
 */
export function swapObjectKeysValues<T extends object>(
  object: T,
  groupValueBy: (value: T[keyof T]) => PropertyKey,
): Record<string, string[]>;
export function swapObjectKeysValues<K extends PropertyKey, V extends PropertyKey>(
  object: Record<K, V>,
): Record<V, K>;
export function swapObjectKeysValues(
  object: object,
  groupValueBy?: (value: never) => PropertyKey,
): object {
  return groupValueBy ? invertBy(object, groupValueBy) : invert(object);
}
