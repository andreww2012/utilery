import {splitAt, splitWhen} from 'remeda';
import type {ArraySlice} from 'type-fest';

type SplitAt<T extends readonly unknown[], Index extends number> = number extends Index
  ? [T[number][], T[number][]]
  : [ArraySlice<T, 0, Index>, ArraySlice<T, Index>];

/**
 * Splits an array into a `[before, after]` pair.
 * The split point is either an index, or determined by a predicate matching the
 * first element that should begin the second part.
 *
 * A single second argument selects the split mode: pass a predicate to split at
 * the first match instead of a fixed index.
 *
 * The index form is **tuple-preserving**: splitting a fixed-length tuple at a
 * literal index yields the exact sub-tuples (a negative index counts from the
 * end, just like `Array#slice`), rather than the widened `[T[], T[]]`.
 * A non-literal index or a predicate falls back to
 * `[T[number][], T[number][]]`.
 * @param array - The array (or tuple) to split.
 * Not mutated.
 * @param index - The index at which to split (negative counts from the end).
 * Alternatively, pass a predicate `(value, index, array) => boolean` to split at
 * the first matching element; when nothing matches, the second part is empty.
 * @returns A `[before, after]` pair.
 * @example
 * // Split at an index
 * arraySplit([1, 2, 3, 4, 5], 2);
 * // [[1, 2], [3, 4, 5]]
 * @example
 * // Tuple input + literal index: exact sub-tuples in the type
 * arraySplit(['a', 1, true, 'b'] as const, 2);
 * // [['a', 1], [true, 'b']]
 * @example
 * // Negative index counts from the end
 * arraySplit([1, 2, 3, 4, 5], -2);
 * // [[1, 2, 3], [4, 5]]
 * @example
 * // Split at the first element matching a predicate
 * arraySplit([1, 2, 3, 4, 1], (value) => value > 2);
 * // [[1, 2], [3, 4, 1]]
 * @example
 * // No match: the second part is empty
 * arraySplit([1, 2, 3], (value) => value > 10);
 * // [[1, 2, 3], []]
 */
export function arraySplit<T extends readonly unknown[], Index extends number>(
  array: T,
  index: Index,
): SplitAt<T, Index>;
export function arraySplit<T extends readonly unknown[]>(
  array: T,
  predicate: (value: T[number], index: number, array: T) => boolean,
): [T[number][], T[number][]];
export function arraySplit<T>(
  array: readonly T[],
  indexOrPredicate: number | ((value: T, index: number, array: readonly T[]) => boolean),
): [T[], T[]] {
  return typeof indexOrPredicate === 'function'
    ? splitWhen(array, indexOrPredicate)
    : splitAt(array, indexOrPredicate);
}
