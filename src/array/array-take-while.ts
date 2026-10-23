import {takeRightWhile, takeWhile} from 'es-toolkit/array';

/**
 * Takes a contiguous run of elements from one edge of an array, walking inward
 * as long as the predicate returns `true`.
 * The first `false` result stops the taking, and only the elements collected up
 * to that point are returned.
 * @param array - The array to take elements from.
 * Not mutated.
 * @param predicate - `(item, index, array) => boolean`.
 * Elements are taken while it returns `true`; the first `false` result stops
 * the taking.
 * @param isFromRight - When `true`, the predicate walks the array from the last
 * element backwards and trailing matches are returned in their original order.
 * Defaults to `false` (walks from the first element).
 * @returns A new array containing the matching edge run.
 * @example
 * // Take leading elements while a predicate is true
 * arrayTakeWhile([1, 2, 3, 4, 5], (item) => item < 3);
 * // [1, 2]
 * @example
 * // Taking stops at the first non-matching element, even if later items match again
 * arrayTakeWhile([1, 2, 3, 1, 2], (item) => item < 3);
 * // [1, 2]
 * @example
 * // Returns an empty array when the predicate is false for the first element
 * arrayTakeWhile([5, 1, 2], (item) => item < 3);
 * // []
 * @example
 * // Take trailing elements while a predicate is true (walks from the end)
 * arrayTakeWhile([1, 2, 3, 4, 5], (item) => item > 3, true);
 * // [4, 5]
 * @example
 * // From the right, taking stops at the first non-matching element from the end
 * arrayTakeWhile([5, 4, 3, 4, 5], (item) => item > 3, true);
 * // [4, 5]
 * @example
 * // The predicate receives the item, its original index, and the source array
 * arrayTakeWhile(['a', 'b', 'c', 'd'], (_item, index) => index < 2);
 * // ['a', 'b']
 */
export const arrayTakeWhile = <T>(
  array: readonly T[],
  predicate: (item: T, index: number, array: readonly T[]) => boolean,
  isFromRight = false,
): T[] => {
  return isFromRight ? takeRightWhile(array, predicate) : takeWhile(array, predicate);
};
