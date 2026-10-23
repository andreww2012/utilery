import {sort} from 'remeda';

/**
 * Returns a new array with the elements of `array` sorted by `comparator`, just
 * like `Array.prototype.toSorted`, but preserves the *length* of the input in
 * the return type: sorting a fixed-length tuple yields a tuple of the same
 * length (whose slots are the union of the input's element types, since the
 * order is not known at the type level), rather than a widened union array.
 * Regular arrays still sort to `T[]`.
 *
 * The length is the one thing native `array.toSorted()` cannot preserve at the
 * type level, and the reason this util exists.
 * Unlike `Array.prototype.sort`, it does not mutate the input.
 * For key-based ordering use `sortBy`; for ordering rules without a full sort
 * see `arrayFirstBy` and friends.
 * @param array - The array (or tuple) to sort.
 * Not mutated.
 * @param comparator - Returns a negative number if `a` should come before `b`, positive if after,
 * `0` if equal.
 * @returns A new sorted array, length-preserving when the input is a tuple.
 * @example
 * // Regular array: sorts to `T[]`
 * arraySort([4, 2, 7, 5], (a, b) => a - b);
 * // [2, 4, 5, 7]
 * @example
 * // Tuple input: the length is preserved in the type (a 3-element tuple)
 * arraySort([3, 1, 2] as const, (a, b) => a - b);
 * // [1, 2, 3]
 */
export const arraySort = <T extends readonly unknown[]>(
  array: T,
  comparator: (a: T[number], b: T[number]) => number,
) => sort(array, comparator);
