import {identity} from '../function/identity.ts';
import {countBy} from '../iterable/count-by.ts';

/**
 * Checks whether two arrays have the same elements, in any order.
 * Each element must appear the same number of times in both arrays, so
 * `[1, 1, 2]` and `[1, 2, 2]` are not equal.
 * Elements are compared with `SameValueZero`, like `Set.prototype.has`: to
 * compare them another way, pass a comparator or a key function as the third
 * argument.
 *
 * The two arrays may have elements of different types.
 * Empty slots count as `undefined`.
 * To compare the elements in order, use `isEqual` or `isEqualShallow`.
 * @param firstArray - The first array.
 * Not mutated.
 * @param secondArray - The second array.
 * Not mutated.
 * @returns `true` if the arrays have the same elements the same number of times, otherwise
 * `false`.
 * @example
 * arrayIsEqualUnordered([1, 2, 3], [3, 1, 2]);
 * // true
 * arrayIsEqualUnordered([1, 2, 3], [1, 2]);
 * // false
 * @example
 * // Duplicates must match too
 * arrayIsEqualUnordered([1, 1, 2], [1, 2, 2]);
 * // false
 */
export function arrayIsEqualUnordered(
  firstArray: readonly unknown[],
  secondArray: readonly unknown[],
): boolean;

/**
 * Checks whether two arrays have the same elements, in any order, comparing
 * elements with a custom function.
 * Each element of one array must be equal to a different element of the other.
 * @param firstArray - The first array.
 * Not mutated.
 * @param secondArray - The second array.
 * Not mutated.
 * @param areItemsEqual - Tells whether two elements are equal: `x` is from `firstArray` and `y`
 * from `secondArray`.
 * It must declare both parameters: a function with one parameter is used as a key function, which
 * also gets the elements of `secondArray`.
 * @returns `true` if the elements of the arrays can be split into pairs of equal ones, otherwise
 * `false`.
 * @example
 * arrayIsEqualUnordered(
 *   [{id: 1}, {id: 2}],
 *   [{id: 2}, {id: 1}],
 *   (a, b) => a.id === b.id,
 * );
 * // true
 * @example
 * // Across arrays of different types
 * arrayIsEqualUnordered([{id: 1}, {id: 2}], [2, 1], (a, b) => a.id === b);
 * // true
 */
export function arrayIsEqualUnordered<T, U>(
  firstArray: readonly T[],
  secondArray: readonly U[],
  areItemsEqual: (x: T, y: U) => boolean,
): boolean;

/**
 * Checks whether two arrays have the same elements, in any order, comparing
 * the keys a function maps the elements of both arrays to.
 * Each key must appear the same number of times in both arrays.
 * @param firstArray - The first array.
 * Not mutated.
 * @param secondArray - The second array.
 * Not mutated.
 * @param mapper - Maps an element of either array to the key to compare.
 * Declare the type of its parameter when the arrays have different element types:
 * TypeScript infers it from `firstArray` only.
 * @returns `true` if the arrays have the same keys the same number of times, otherwise `false`.
 * @example
 * arrayIsEqualUnordered(
 *   [{id: 1}, {id: 2}],
 *   [{id: 2}, {id: 1}],
 *   (item) => item.id,
 * );
 * // true
 * @example
 * // Across arrays of different types
 * arrayIsEqualUnordered(
 *   [{id: 1}, {id: 2}],
 *   [2, 1],
 *   (item: {id: number} | number) => (typeof item === 'object' ? item.id : item),
 * );
 * // true
 */
export function arrayIsEqualUnordered<T, U>(
  firstArray: readonly T[],
  secondArray: readonly U[],
  mapper: (value: T | U) => unknown,
): boolean;
export function arrayIsEqualUnordered<T>(
  firstArray: readonly T[],
  secondArray: readonly unknown[],
  fn?: ((value: unknown) => unknown) | ((x: T, y: unknown) => boolean),
): boolean {
  if (firstArray.length !== secondArray.length) {
    return false;
  }

  if (fn?.length === 2) {
    // eslint-disable-next-line un/no-type-assertion -- TypeScript can't narrow `fn` by its `length`
    const areItemsEqual = fn as (x: T, y: unknown) => boolean;
    const unmatchedItems = [...secondArray];

    // Not `every`, which skips empty slots
    for (const item of firstArray) {
      const index = unmatchedItems.findIndex((otherItem) => areItemsEqual(item, otherItem));
      if (index === -1) {
        return false;
      }

      unmatchedItems.splice(index, 1);
    }

    return true;
  }

  // eslint-disable-next-line un/no-type-assertion -- TypeScript can't narrow `fn` by its `length`
  const mapper = (fn as ((value: unknown) => unknown) | undefined) || identity;
  const counts = countBy(firstArray, (item) => mapper(item));

  // Not `every`, which skips empty slots
  for (const item of secondArray) {
    const key = mapper(item);
    const count = counts.get(key);
    if (!count) {
      return false;
    }

    counts.set(key, count - 1);
  }

  return true;
}
