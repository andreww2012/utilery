import {intersectionBy, intersectionWith} from 'es-toolkit/array';

/**
 * Returns the intersection of two arrays: the elements from `firstArray` that
 * are also present in `secondArray`.
 * The strategy used for the equality check depends on the optional third
 * argument:
 *
 * - When omitted, items are compared using `SameValueZero` (the same semantics
 *   as `Set.prototype.has`).
 * - When a binary function `(a, b) => boolean` is passed, it is used as a
 *   custom comparator (delegates to `intersectionWith`).
 * - When a unary function `(value) => key` is passed, both arrays are mapped
 *   through it and the resulting keys are compared (delegates to
 *   `intersectionBy`).
 * @param firstArray - The array whose elements may appear in the result.
 * Not mutated.
 * @param secondArray - The array of elements to intersect with.
 * @returns A new array containing the elements from `firstArray` that also appear in `secondArray`.
 * @example
 * // Basic equality (SameValueZero)
 * arrayIntersection([1, 2, 3, 4, 5], [2, 4, 6]);
 * // [2, 4]
 * @example
 * // With a mapper: compare by a derived key
 * arrayIntersection(
 *   [{id: 1}, {id: 2}, {id: 3}],
 *   [{id: 2}, {id: 4}],
 *   (item) => item.id,
 * );
 * // [{id: 2}]
 * @example
 * // With a mapper across heterogeneous arrays
 * arrayIntersection(
 *   [{id: 1}, {id: 2}, {id: 3}],
 *   [2, 4],
 *   (item) => (typeof item === 'object' ? item.id : item),
 * );
 * // [{id: 2}]
 * @example
 * // With a custom comparator
 * arrayIntersection(
 *   [{id: 1}, {id: 2}, {id: 3}],
 *   [{id: 2}, {id: 4}],
 *   (a, b) => a.id === b.id,
 * );
 * // [{id: 2}]
 */
export function arrayIntersection<T>(firstArray: readonly T[], secondArray: readonly T[]): T[];
export function arrayIntersection<T, U>(
  firstArray: readonly T[],
  secondArray: readonly U[],
  areItemsEqual: (x: T, y: U) => boolean,
): T[];
export function arrayIntersection<T, U>(
  firstArray: readonly T[],
  secondArray: readonly U[],
  // eslint-disable-next-line ts/unified-signatures -- merging signatures results in less strict type inference for the provided function
  mapper: (value: T | U) => unknown,
): T[];
export function arrayIntersection<T>(
  firstArray: readonly T[],
  secondArray: readonly unknown[],
  fn?: ((value: unknown) => unknown) | ((x: T, y: unknown) => boolean),
): T[] {
  if (!fn) {
    const secondSet = new Set(secondArray);
    return firstArray.filter((item) => secondSet.has(item));
  }

  return fn.length === 2
    ? intersectionWith(firstArray, secondArray, fn as (x: T, y: unknown) => boolean)
    : intersectionBy(firstArray, secondArray, fn as (value: unknown) => unknown);
}
