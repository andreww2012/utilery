import {sortedIndexOf as sortedIndexOfFirst, sortedLastIndexOf} from 'es-toolkit/compat';

/**
 * Finds the index of `value` within an already-sorted `sortedArray` using a
 * binary search, returning `-1` when it is not present.
 * By default the *first* matching index is returned; pass `rightmost: true` to
 * get the *last* one.
 *
 * Consolidates the first-match and last-match variants behind a single options argument.
 * Unlike {@link sortedArrayInsertionIndex}, this searches for an existing value rather
 * than an insertion point, so it only accepts directly comparable elements.
 * @param sortedArray - The already-sorted array to search.
 * Not mutated.
 * @param value - The value to locate.
 * @param options - Optional behavior flags.
 * @param options.rightmost - Set to `true` to return the last matching index instead of the first.
 * Defaults to `false`.
 * @returns The index of `value`, or `-1` when it is not found.
 * @example
 * // First matching index (the default)
 * sortedArrayIndexOf([10, 20, 30, 30, 40], 30);
 * // 2
 * @example
 * // Last matching index
 * sortedArrayIndexOf([10, 20, 30, 30, 40], 30, {rightmost: true});
 * // 3
 * @example
 * // Not found
 * sortedArrayIndexOf([10, 20, 40], 30);
 * // -1
 */
export const sortedArrayIndexOf = <T extends number | string>(
  sortedArray: readonly T[],
  value: T,
  options?: {
    /**
     * Set to `true` to return the last matching index instead of the first.
     * Defaults to `false`
     */
    rightmost?: boolean;
  },
): number =>
  options?.rightmost
    ? sortedLastIndexOf(sortedArray, value)
    : sortedIndexOfFirst(sortedArray, value);
