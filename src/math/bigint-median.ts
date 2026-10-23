import {median, medianBy} from 'es-toolkit/bigint';

/**
 * Calculates the median of an iterable of bigints, so it works on any iterable
 * (generators, `Set`s, ...), not just arrays.
 * When the second argument is omitted, the elements are used directly.
 * When a `getValue` function is provided, each element is mapped through it
 * first and the resulting bigints are used.
 *
 * The bigint counterpart of `median`.
 * The input is materialized into an array internally.
 * For an odd-length input the median is the middle value of the sorted
 * sequence; for an even-length input it is the average of the two middle
 * values, rounded toward zero (bigint division).
 * Throws a `RangeError` for an empty input, as there is no bigint `NaN`.
 * @param items - The iterable to compute the median of.
 * Not mutated.
 * @param getValue - Optional selector that produces the bigint to use from
 * each element.
 * @returns The median.
 * @example
 * bigintMedian([3n, 1n, 2n]);
 * // 2n
 * @example
 * // Even-length input: the average is rounded toward zero
 * bigintMedian([1n, 2n, 3n, 4n]);
 * // 2n
 * @example
 * // With a selector: median of a bigint field of objects
 * bigintMedian([{size: 1n}, {size: 5n}, {size: 3n}], (item) => item.size);
 * // 3n
 */
export function bigintMedian<T>(items: Iterable<T>, getValue: (element: T) => bigint): bigint;
export function bigintMedian(items: Iterable<bigint>): bigint;
export function bigintMedian<T>(items: Iterable<T>, getValue?: (element: T) => bigint): bigint {
  return getValue ? medianBy([...items], getValue) : median([...items] as bigint[]);
}
