import {isSubsetWith} from 'es-toolkit/array';

/**
 * Checks whether every element of `subset` is also present in `superset`.
 * The strategy used for the equality check depends on the optional third
 * argument:
 *
 * - When omitted, items are compared using `SameValueZero` (the same semantics
 *   as `Set.prototype.has`).
 * - When a binary function `(a, b) => boolean` is passed, it is used as a
 *   custom comparator (delegates to `isSubsetWith`).
 * - When a unary function `(value) => key` is passed, both arrays are mapped
 *   through it and the resulting keys are compared.
 *
 * An empty `subset` is always a subset (returns `true`).
 * @param superset - The array that may contain all elements of `subset`.
 * @param subset - The array to check against `superset`.
 * @returns `true` if every element of `subset` is present in `superset`, otherwise `false`.
 * @example
 * // Basic equality (SameValueZero)
 * arrayIsSubset([1, 2, 3, 4, 5], [2, 4]);
 * // true
 * @example
 * // With a mapper: compare by a derived key
 * arrayIsSubset(
 *   [{id: 1}, {id: 2}, {id: 3}],
 *   [{id: 2}],
 *   (item) => item.id,
 * );
 * // true
 * @example
 * // With a mapper across heterogeneous arrays
 * arrayIsSubset(
 *   [{id: 1}, {id: 2}, {id: 3}],
 *   [2],
 *   (item) => (typeof item === 'object' ? item.id : item),
 * );
 * // true
 * @example
 * // With a custom comparator
 * arrayIsSubset(
 *   [{id: 1}, {id: 2}, {id: 3}],
 *   [{id: 4}],
 *   (a, b) => a.id === b.id,
 * );
 * // false
 */
export function arrayIsSubset<T>(superset: readonly T[], subset: readonly T[]): boolean;
export function arrayIsSubset<T, U>(
  superset: readonly T[],
  subset: readonly U[],
  areItemsEqual: (x: T, y: U) => boolean,
): boolean;
export function arrayIsSubset<T, U>(
  superset: readonly T[],
  subset: readonly U[],
  // eslint-disable-next-line ts/unified-signatures -- merging signatures results in less strict type inference for the provided function
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
