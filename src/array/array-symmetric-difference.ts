import {xorBy, xorWith} from 'es-toolkit/array';

/**
 * Returns the symmetric difference of two arrays: the elements that appear in
 * exactly one of `firstArray` or `secondArray`, but not in both.
 * Duplicates within a single input are collapsed.
 * Order of the result is the order of first appearance in `firstArray` followed
 * by the order of first appearance in `secondArray`.
 *
 * Elements are compared with `SameValueZero`, like `Set.prototype.has`: to
 * compare them another way, pass a comparator or a key function as the third
 * argument.
 * @param firstArray - The first array.
 * Not mutated.
 * @param secondArray - The second array.
 * Not mutated.
 * @returns A new array containing the elements that are present in either `firstArray` or
 * `secondArray` but not in both.
 * @example
 * arraySymmetricDifference([1, 2, 3, 4], [3, 4, 5, 6]);
 * // [1, 2, 5, 6]
 */
export function arraySymmetricDifference<T>(
  firstArray: readonly T[],
  secondArray: readonly T[],
): T[];

/**
 * Returns the elements that appear in exactly one of `firstArray` or
 * `secondArray`, comparing elements with a custom function.
 * @param firstArray - The first array.
 * Not mutated.
 * @param secondArray - The second array.
 * Not mutated.
 * @param areItemsEqual - Tells whether two elements are equal.
 * @returns A new array containing the elements that are present in either `firstArray` or
 * `secondArray` but not in both.
 * @example
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
  areItemsEqual: (x: T, y: T) => boolean,
): T[];

/**
 * Returns the elements that appear in exactly one of `firstArray` or
 * `secondArray`, comparing the keys a function maps them to.
 * @param firstArray - The first array.
 * Not mutated.
 * @param secondArray - The second array.
 * Not mutated.
 * @param mapper - Maps an element to the key to compare.
 * @returns A new array containing the elements whose keys are present in either `firstArray` or
 * `secondArray` but not in both.
 * @example
 * arraySymmetricDifference(
 *   [{id: 1}, {id: 2}],
 *   [{id: 2}, {id: 3}],
 *   (item) => item.id,
 * );
 * // [{id: 1}, {id: 3}]
 */
export function arraySymmetricDifference<T>(
  firstArray: readonly T[],
  secondArray: readonly T[],
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
