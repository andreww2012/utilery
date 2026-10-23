import {sortedIndexWith} from 'remeda';

/**
 * Finds an insertion index into an already-sorted `sortedArray` using a binary
 * search driven by a `predicate`.
 * The predicate must return `true` for every element that should come *before*
 * the insertion point and `false` from there on (i.e. it must be monotonic over
 * the sorted array); the returned index is the first position at which it
 * becomes `false`, in the range `0..sortedArray.length`.
 *
 * This is the most general member of the `sortedArrayInsertionIndex*` family:
 * unlike `sortedArrayInsertionIndex` it takes no search value and is not
 * limited to `number`/`string` keys, so it can locate a boundary for any
 * comparable condition.
 * @param sortedArray - The already-sorted array to search.
 * Not mutated.
 * @param predicate - Returns `true` for elements before the insertion point.
 * Receives the value, its index, and the array.
 * @returns The first index at which `predicate` returns `false`, in `0..sortedArray.length`.
 * @example
 * // First index whose value is not less than 2
 * sortedArrayInsertionIndexWith([1, 2, 2, 3], (value) => value < 2);
 * // 1
 * @example
 * // Boundary by a derived key
 * sortedArrayInsertionIndexWith(
 *   [{age: 10}, {age: 20}, {age: 30}],
 *   (item) => item.age < 25,
 * );
 * // 2
 */
export const sortedArrayInsertionIndexWith = <T>(
  sortedArray: readonly T[],
  predicate: (value: T, index: number, array: readonly T[]) => boolean,
) => sortedIndexWith(sortedArray, predicate);
