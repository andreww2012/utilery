import {isSubsetWith} from 'es-toolkit/array';

/**
 * Checks whether every element of `subset` is also present in `superset`.
 * Elements are compared with `SameValueZero`, like `Set.prototype.has`: to
 * compare them another way, pass a comparator or a key function as the third
 * argument.
 *
 * An empty `subset` is always a subset (returns `true`).
 * @param superset - The array that may contain all elements of `subset`.
 * @param subset - The array to check against `superset`.
 * @returns `true` if every element of `subset` is present in `superset`, otherwise `false`.
 * @example
 * arrayIsSubset([1, 2, 3, 4, 5], [2, 4]);
 * // true
 */
export function arrayIsSubset<T>(superset: readonly T[], subset: readonly T[]): boolean;

/**
 * Checks whether every element of `subset` is also present in `superset`,
 * comparing elements with a custom function.
 * An empty `subset` is always a subset (returns `true`).
 * @param superset - The array that may contain all elements of `subset`.
 * @param subset - The array to check against `superset`.
 * @param areItemsEqual - Tells whether two elements are equal: `x` is from `superset` and `y` from
 * `subset`.
 * @returns `true` if every element of `subset` is present in `superset`, otherwise `false`.
 * @example
 * arrayIsSubset(
 *   [{id: 1}, {id: 2}, {id: 3}],
 *   [{id: 4}],
 *   (a, b) => a.id === b.id,
 * );
 * // false
 */
export function arrayIsSubset<T, U>(
  superset: readonly T[],
  subset: readonly U[],
  areItemsEqual: (x: T, y: U) => boolean,
): boolean;

/**
 * Checks whether every element of `subset` is also present in `superset`,
 * comparing the keys a function maps the elements of both arrays to.
 * An empty `subset` is always a subset (returns `true`).
 * @param superset - The array that may contain all elements of `subset`.
 * @param subset - The array to check against `superset`.
 * @param mapper - Maps an element of either array to the key to compare.
 * @returns `true` if the key of every element of `subset` is among the keys of `superset`,
 * otherwise `false`.
 * @example
 * arrayIsSubset(
 *   [{id: 1}, {id: 2}, {id: 3}],
 *   [{id: 2}],
 *   (item) => item.id,
 * );
 * // true
 * @example
 * // Across arrays of different types
 * arrayIsSubset(
 *   [{id: 1}, {id: 2}, {id: 3}],
 *   [2],
 *   (item) => (typeof item === 'object' ? item.id : item),
 * );
 * // true
 */
export function arrayIsSubset<T, U>(
  superset: readonly T[],
  subset: readonly U[],
  mapper: (value: T | U) => unknown,
): boolean;
export function arrayIsSubset<T>(
  superset: readonly T[],
  subset: readonly unknown[],
  fn?: ((value: unknown) => unknown) | ((x: T, y: unknown) => boolean),
): boolean {
  if (!fn) {
    const supersetSet = new Set(superset);
    return subset.every((item) => supersetSet.has(item as T));
  }

  if (fn.length === 2) {
    const areItemsEqual = fn as (x: T, y: unknown) => boolean;
    return isSubsetWith(superset, subset as readonly T[], (subsetItem, supersetItem) =>
      areItemsEqual(supersetItem, subsetItem),
    );
  }

  const mapper = fn as (value: unknown) => unknown;
  const mappedSuperset = new Set(superset.map((item) => mapper(item)));
  return subset.every((item) => mappedSuperset.has(mapper(item)));
}
