import {intersectionBy, intersectionWith} from 'es-toolkit/array';

/**
 * Returns the intersection of two arrays: the elements from `firstArray` that
 * are also present in `secondArray`.
 * Elements are compared with `SameValueZero`, like `Set.prototype.has`: to
 * compare them another way, pass a comparator or a key function as the third
 * argument.
 * @param firstArray - The array whose elements may appear in the result.
 * Not mutated.
 * @param secondArray - The array of elements to intersect with.
 * @returns A new array containing the elements from `firstArray` that also appear in `secondArray`.
 * @example
 * arrayIntersection([1, 2, 3, 4, 5], [2, 4, 6]);
 * // [2, 4]
 */
export function arrayIntersection<T>(firstArray: readonly T[], secondArray: readonly T[]): T[];

/**
 * Returns the elements from `firstArray` that are also present in
 * `secondArray`, comparing elements with a custom function.
 * @param firstArray - The array whose elements may appear in the result.
 * Not mutated.
 * @param secondArray - The array of elements to intersect with.
 * @param areItemsEqual - Tells whether two elements are equal: `x` is from `firstArray` and `y`
 * from `secondArray`.
 * @returns A new array containing the elements from `firstArray` that also appear in `secondArray`.
 * @example
 * arrayIntersection(
 *   [{id: 1}, {id: 2}, {id: 3}],
 *   [{id: 2}, {id: 4}],
 *   (a, b) => a.id === b.id,
 * );
 * // [{id: 2}]
 */
export function arrayIntersection<T, U>(
  firstArray: readonly T[],
  secondArray: readonly U[],
  areItemsEqual: (x: T, y: U) => boolean,
): T[];

/**
 * Returns the elements from `firstArray` that are also present in
 * `secondArray`, comparing the keys a function maps the elements of both
 * arrays to.
 * @param firstArray - The array whose elements may appear in the result.
 * Not mutated.
 * @param secondArray - The array of elements to intersect with.
 * @param mapper - Maps an element of either array to the key to compare.
 * @returns A new array containing the elements from `firstArray` whose keys also appear among the
 * keys of `secondArray`.
 * @example
 * arrayIntersection(
 *   [{id: 1}, {id: 2}, {id: 3}],
 *   [{id: 2}, {id: 4}],
 *   (item) => item.id,
 * );
 * // [{id: 2}]
 * @example
 * // Across arrays of different types
 * arrayIntersection(
 *   [{id: 1}, {id: 2}, {id: 3}],
 *   [2, 4],
 *   (item) => (typeof item === 'object' ? item.id : item),
 * );
 * // [{id: 2}]
 */
export function arrayIntersection<T, U>(
  firstArray: readonly T[],
  secondArray: readonly U[],
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
