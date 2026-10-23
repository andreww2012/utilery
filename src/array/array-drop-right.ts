import {dropRight, dropRightWhile} from 'es-toolkit/array';

/**
 * Removes elements from the end of an array.
 * The number of elements to drop is either given directly as a count, or
 * determined by a predicate that decides how long to keep dropping from the end
 * (the predicate walks the array from the last element backwards).
 * @param array - The array to drop elements from.
 * Not mutated.
 * @param itemsCountOrPredicate - Either the number of elements to drop from the
 * end, or a predicate `(item, index, array) => boolean`.
 * When a predicate is passed, elements are dropped from the end as long as it
 * returns `true`; the first `false` result (walking right-to-left) stops the
 * dropping.
 * @returns A new array with the trailing elements removed.
 * @example
 * // Drop the last N elements
 * arrayDropRight([1, 2, 3, 4, 5], 2);
 * // [1, 2, 3]
 * @example
 * // A count of 0 returns a copy of the original array
 * arrayDropRight([1, 2, 3], 0);
 * // [1, 2, 3]
 * @example
 * // A count greater than or equal to the length returns an empty array
 * arrayDropRight([1, 2, 3], 10);
 * // []
 * @example
 * // Drop while a predicate is true, scanning from the end
 * arrayDropRight([1, 2, 3, 4, 5], (item) => item > 3);
 * // [1, 2, 3]
 * @example
 * // Dropping stops at the first non-matching element from the end,
 * // even if earlier items would also have matched
 * arrayDropRight([5, 4, 3, 4, 5], (item) => item > 3);
 * // [5, 4, 3]
 * @example
 * // The predicate receives the item, its original index, and the source array
 * arrayDropRight(['a', 'b', 'c', 'd'], (_item, index) => index >= 2);
 * // ['a', 'b']
 */
export const arrayDropRight = <T>(
  array: readonly T[],
  itemsCountOrPredicate: number | ((item: T, index: number, array: readonly T[]) => boolean),
): T[] => {
  return typeof itemsCountOrPredicate === 'function'
    ? dropRightWhile(array, itemsCountOrPredicate)
    : dropRight(array, itemsCountOrPredicate);
};
