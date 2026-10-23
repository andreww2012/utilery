import {unionBy, unionWith} from 'es-toolkit/array';

/**
 * Returns the union of two arrays: all unique elements from both `firstArray`
 * and `secondArray`, preserving order of first appearance.
 * Elements are compared with `SameValueZero`, like `Set.prototype.has`: to
 * compare them another way, pass a comparator or a key function as the third
 * argument.
 * @param firstArray - The first array.
 * Not mutated.
 * @param secondArray - The second array.
 * Not mutated.
 * @returns A new array containing all unique elements from both arrays.
 * @example
 * arrayUnion([1, 2, 3], [3, 4, 5]);
 * // [1, 2, 3, 4, 5]
 */
export function arrayUnion<T>(firstArray: readonly T[], secondArray: readonly T[]): T[];

/**
 * Returns all unique elements from both `firstArray` and `secondArray`,
 * preserving order of first appearance and comparing elements with a custom
 * function.
 * @param firstArray - The first array.
 * Not mutated.
 * @param secondArray - The second array.
 * Not mutated.
 * @param areItemsEqual - Tells whether two elements are equal.
 * @returns A new array containing all unique elements from both arrays.
 * @example
 * arrayUnion(
 *   [{id: 1}, {id: 2}],
 *   [{id: 2}, {id: 3}],
 *   (a, b) => a.id === b.id,
 * );
 * // [{id: 1}, {id: 2}, {id: 3}]
 */
export function arrayUnion<T>(
  firstArray: readonly T[],
  secondArray: readonly T[],
  areItemsEqual: (x: T, y: T) => boolean,
): T[];

/**
 * Returns all unique elements from both `firstArray` and `secondArray`,
 * preserving order of first appearance and comparing the keys a function maps
 * them to.
 * @param firstArray - The first array.
 * Not mutated.
 * @param secondArray - The second array.
 * Not mutated.
 * @param mapper - Maps an element to the key to compare.
 * @returns A new array containing the elements with unique keys from both arrays.
 * @example
 * arrayUnion(
 *   [{id: 1}, {id: 2}],
 *   [{id: 2}, {id: 3}],
 *   (item) => item.id,
 * );
 * // [{id: 1}, {id: 2}, {id: 3}]
 */
export function arrayUnion<T>(
  firstArray: readonly T[],
  secondArray: readonly T[],
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
