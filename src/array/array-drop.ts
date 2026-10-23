import {drop, dropWhile} from 'es-toolkit/array';

/**
 * Removes elements from the beginning of an array.
 * The number of elements to drop is either given directly as a count, or
 * determined by a predicate that decides how long to keep dropping from the
 * start.
 * @param array - The array to drop elements from.
 * Not mutated.
 * @param itemsCountOrPredicate - Either the number of elements to drop from the
 * start, or a predicate `(item, index, array) => boolean`.
 * When a predicate is passed, elements are dropped from the start as long as it
 * returns `true`; the first `false` result stops the dropping.
 * @returns A new array with the leading elements removed.
 * @example
 * // Drop the first N elements
 * arrayDrop([1, 2, 3, 4, 5], 2);
 * // [3, 4, 5]
 * @example
 * // A count of 0 returns a copy of the original array
 * arrayDrop([1, 2, 3], 0);
 * // [1, 2, 3]
 * @example
 * // A count greater than or equal to the length returns an empty array
 * arrayDrop([1, 2, 3], 10);
 * // []
 * @example
 * // Drop while a predicate is true (stops at the first `false`)
 * arrayDrop([1, 2, 3, 4, 5], (item) => item < 3);
 * // [3, 4, 5]
 * @example
 * // Dropping stops at the first non-matching element, even if later items match again
 * arrayDrop([1, 2, 3, 1, 2], (item) => item < 3);
 * // [3, 1, 2]
 * @example
 * // The predicate receives the item, its index, and the source array
 * arrayDrop(['a', 'b', 'c', 'd'], (_item, index) => index < 2);
 * // ['c', 'd']
 */
export const arrayDrop = <T>(
  array: readonly T[],
  itemsCountOrPredicate: number | ((item: T, index: number, array: readonly T[]) => boolean),
): T[] => {
  return typeof itemsCountOrPredicate === 'function'
    ? dropWhile(array, itemsCountOrPredicate)
    : drop(array, itemsCountOrPredicate);
};
