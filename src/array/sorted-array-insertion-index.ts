import {
  sortedIndexBy,
  sortedIndex as sortedIndexLeftmost,
  sortedLastIndex,
  sortedLastIndexBy,
} from 'es-toolkit/compat';

/**
 * Finds the index at which `value` should be inserted into an already-sorted
 * `sortedArray` to keep it sorted, using a binary search.
 * The return value is always in the range `0..sortedArray.length`.
 *
 * Consolidates the leftmost/rightmost and compare-by-key variants behind a
 * single options argument:
 *
 * - Pass an `iteratee` to compare by a derived numeric/string key instead of
 *   the values themselves.
 * - Pass `rightmost: true` to get the insertion point *after* any equal
 *   elements rather than before them.
 * @param sortedArray - The already-sorted array to search.
 * Not mutated.
 * @param value - The value to find an insertion index for.
 * @param options - Optional behavior flags.
 * @param options.rightmost - Set to `true` to return the insertion point after any equal elements.
 * Defaults to `false`.
 * @returns The insertion index, in the range `0..sortedArray.length`.
 * @example
 * // Leftmost insertion point (the default)
 * sortedArrayInsertionIndex([10, 20, 30, 30, 40], 30);
 * // 2
 * @example
 * // Rightmost insertion point: after the run of equal elements
 * sortedArrayInsertionIndex([10, 20, 30, 30, 40], 30, {rightmost: true});
 * // 4
 * @example
 * // With an iteratee: compare by a derived key
 * sortedArrayInsertionIndex([{age: 20}, {age: 40}], {age: 30}, {iteratee: (item) => item.age});
 * // 1
 */
export function sortedArrayInsertionIndex<T extends number | string>(
  sortedArray: readonly T[],
  value: T,
  options?: {
    /**
     * Set to `true` to return the insertion point after any equal elements.
     * Defaults to `false`
     */
    rightmost?: boolean;
  },
): number;
export function sortedArrayInsertionIndex<T>(
  sortedArray: readonly T[],
  value: T,
  options: {
    /** Maps each element (and `value`) to the comparable key used for ordering */
    iteratee: (value: T) => number | string;

    /**
     * Set to `true` to return the insertion point after any equal elements.
     * Defaults to `false`
     */
    rightmost?: boolean;
  },
): number;
export function sortedArrayInsertionIndex<T>(
  sortedArray: readonly T[],
  value: T,
  {
    iteratee,
    rightmost = false,
  }: {iteratee?: (value: T) => number | string; rightmost?: boolean} = {},
): number {
  if (iteratee) {
    return rightmost
      ? sortedLastIndexBy(sortedArray, value, iteratee)
      : sortedIndexBy(sortedArray, value, iteratee);
  }

  return rightmost ? sortedLastIndex(sortedArray, value) : sortedIndexLeftmost(sortedArray, value);
}
