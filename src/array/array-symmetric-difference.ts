import {xorBy, xorWith} from 'es-toolkit/array';

/**
 * Returns the symmetric difference of two arrays: the elements that appear in
 * exactly one of `firstArray` or `secondArray`, but not in both.
 * Duplicates within a single input are collapsed.
 * Order of the result is the order of first appearance in `firstArray` followed
 * by the order of first appearance in `secondArray`.
 *
 * The strategy used for the equality check depends on the optional third
 * argument:
 *
 * - When omitted, items are compared using `SameValueZero` (the same semantics
 *   as `Set.prototype.has`).
 * - When a binary function `(a, b) => boolean` is passed, it is used as a
 *   custom comparator (delegates to `xorWith`).
 * - When a unary function `(value) => key` is passed, both arrays are mapped
 *   through it and the resulting keys are compared (delegates to `xorBy`).
 * @param firstArray - The first array.
 * Not mutated.
 * @param secondArray - The second array.
 * Not mutated.
 * @returns A new array containing the elements that are present in either `firstArray` or
 * `secondArray` but not in both.
 * @example
 * // Basic equality (SameValueZero)
 * arraySymmetricDifference([1, 2, 3, 4], [3, 4, 5, 6]);
 * // [1, 2, 5, 6]
 * @example
 * // With a mapper: compare by a derived key
 * arraySymmetricDifference(
 *   [{id: 1}, {id: 2}],
 *   [{id: 2}, {id: 3}],
 *   (item) => item.id,
 * );
 * // [{id: 1}, {id: 3}]
 * @example
 * // With a custom comparator
 * arraySymmetricDifference(
 *   [{id: 1}, {id: 2}],
 *   [{id: 2}, {id: 3}],
 *   (a, b) => a.id === b.id,
 * );
 * // [{id: 1}, {id: 3}]
 */
export function arraySymmetricDifference<T>(
  firstArray: readonly T[],
  secondArray: readonly T[],
): T[];
export function arraySymmetricDifference<T>(
  firstArray: readonly T[],
  secondArray: readonly T[],
  areItemsEqual: (x: T, y: T) => boolean,
): T[];
export function arraySymmetricDifference<T>(
  firstArray: readonly T[],
  secondArray: readonly T[],
  // eslint-disable-next-line ts/unified-signatures -- merging signatures results in less strict type inference for the provided function
  mapper: (value: T) => unknown,
): T[];
export function arraySymmetricDifference<T>(
  firstArray: readonly T[],
  secondArray: readonly T[],
  fn?: ((value: T) => unknown) | ((x: T, y: T) => boolean),
): T[] {
  if (!fn) {
    const firstSet = new Set(firstArray);
    const secondSet = new Set(secondArray);
    const result: T[] = [];

    for (const item of firstSet) {
      if (!secondSet.has(item)) {
        result.push(item);
      }
    }
    for (const item of secondSet) {
      if (!firstSet.has(item)) {
        result.push(item);
      }
    }

    return result;
  }

  return fn.length === 2
    ? xorWith(firstArray, secondArray, fn as (x: T, y: T) => boolean)
    : xorBy(firstArray, secondArray, fn as (value: T) => unknown);
}
