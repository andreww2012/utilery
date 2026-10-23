import {unionBy, unionWith} from 'es-toolkit/array';

/**
 * Returns the union of two arrays: all unique elements from both `firstArray`
 * and `secondArray`, preserving order of first appearance.
 * The strategy used for the equality check depends on the optional third
 * argument:
 *
 * - When omitted, items are compared using `SameValueZero` (the same semantics
 *   as `Set.prototype.has`).
 * - When a binary function `(a, b) => boolean` is passed, it is used as a
 *   custom comparator (delegates to `unionWith`).
 * - When a unary function `(value) => key` is passed, both arrays are mapped
 *   through it and the resulting keys are compared (delegates to `unionBy`).
 * @param firstArray - The first array.
 * Not mutated.
 * @param secondArray - The second array.
 * Not mutated.
 * @returns A new array containing all unique elements from both arrays.
 * @example
 * // Basic equality (SameValueZero)
 * arrayUnion([1, 2, 3], [3, 4, 5]);
 * // [1, 2, 3, 4, 5]
 * @example
 * // With a mapper: compare by a derived key
 * arrayUnion(
 *   [{id: 1}, {id: 2}],
 *   [{id: 2}, {id: 3}],
 *   (item) => item.id,
 * );
 * // [{id: 1}, {id: 2}, {id: 3}]
 * @example
 * // With a custom comparator
 * arrayUnion(
 *   [{id: 1}, {id: 2}],
 *   [{id: 2}, {id: 3}],
 *   (a, b) => a.id === b.id,
 * );
 * // [{id: 1}, {id: 2}, {id: 3}]
 */
export function arrayUnion<T>(firstArray: readonly T[], secondArray: readonly T[]): T[];
export function arrayUnion<T>(
  firstArray: readonly T[],
  secondArray: readonly T[],
  areItemsEqual: (x: T, y: T) => boolean,
): T[];
export function arrayUnion<T>(
  firstArray: readonly T[],
  secondArray: readonly T[],
  // eslint-disable-next-line ts/unified-signatures -- merging signatures results in less strict type inference for the provided function
  mapper: (value: T) => unknown,
): T[];
export function arrayUnion<T>(
  firstArray: readonly T[],
  secondArray: readonly T[],
  fn?: ((value: T) => unknown) | ((x: T, y: T) => boolean),
): T[] {
  if (!fn) {
    return [...new Set([...firstArray, ...secondArray])];
  }

  return fn.length === 2
    ? unionWith(firstArray, secondArray, fn as (x: T, y: T) => boolean)
    : unionBy(firstArray, secondArray, fn as (value: T) => unknown);
}
