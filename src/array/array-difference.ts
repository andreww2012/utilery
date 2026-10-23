import {differenceBy, differenceWith} from 'es-toolkit/array';

/**
 * Returns the difference of two arrays: the elements from `firstArray` that are
 * *not* present in `secondArray`.
 * The strategy used for the equality check depends on the optional third
 * argument:
 *
 * - When omitted, items are compared using `SameValueZero` (the same
 *   semantics as `Set.prototype.has`).
 * - When a binary function `(a, b) => boolean` is passed, it is used as a
 *   custom comparator (delegates to `differenceWith`).
 * - When a unary function `(value) => key` is passed, both arrays are mapped
 *   through it and the resulting keys are compared (delegates to
 *   `differenceBy`).
 * @param firstArray - The array whose elements may appear in the result.
 * Not mutated.
 * @param secondArray - The array of elements to exclude.
 * @returns A new array containing the elements from `firstArray` that do not appear in
 * `secondArray`.
 * @example
 * // Basic equality (SameValueZero)
 * arrayDifference([1, 2, 3, 4, 5], [2, 4]);
 * // [1, 3, 5]
 * @example
 * // With a mapper: compare by a derived key
 * arrayDifference(
 *   [{id: 1}, {id: 2}, {id: 3}],
 *   [{id: 2}, {id: 4}],
 *   (item) => item.id,
 * );
 * // [{id: 1}, {id: 3}]
 * @example
 * // With a mapper across heterogeneous arrays
 * arrayDifference(
 *   [{id: 1}, {id: 2}, {id: 3}],
 *   [2, 4],
 *   (item) => (typeof item === 'object' ? item.id : item),
 * );
 * // [{id: 1}, {id: 3}]
 * @example
 * // With a custom comparator
 * arrayDifference(
 *   [{id: 1}, {id: 2}, {id: 3}],
 *   [{id: 2}, {id: 4}],
 *   (a, b) => a.id === b.id,
 * );
 * // [{id: 1}, {id: 3}]
 */
export function arrayDifference<T>(firstArray: readonly T[], secondArray: readonly T[]): T[];
export function arrayDifference<T, U>(
  firstArray: readonly T[],
  secondArray: readonly U[],
  areItemsEqual: (x: T, y: U) => boolean,
): T[];
export function arrayDifference<T, U>(
  firstArray: readonly T[],
  secondArray: readonly U[],
  // eslint-disable-next-line ts/unified-signatures -- merging signatures results in less strict type inference for the provided function
  mapper: (value: T | U) => unknown,
): T[];
export function arrayDifference<T>(
  firstArray: readonly T[],
  secondArray: readonly unknown[],
  fn?: ((value: unknown) => unknown) | ((x: T, y: unknown) => boolean),
): T[] {
  if (!fn) {
    const secondSet = new Set(secondArray);
    return firstArray.filter((item) => !secondSet.has(item));
  }

  return fn.length === 2
    ? differenceWith(firstArray, secondArray, fn as (x: T, y: unknown) => boolean)
    : differenceBy(firstArray, secondArray, fn as (value: unknown) => unknown);
}
