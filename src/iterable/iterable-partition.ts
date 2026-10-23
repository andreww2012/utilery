import {partition} from 'es-toolkit/iterator';

/**
 * Splits the elements of an iterable into two arrays: the elements for which
 * `predicate` returns `true`, and the rest.
 * The order is kept in both arrays.
 * Consumes the whole iterable, so never use it on an infinite one.
 *
 * The iterable counterpart of `array/arrayPartition`.
 * @param iterable - The iterable to split.
 * @param predicate - Called with `(value, index)`; `true` sends the element to the first array.
 * @returns A `[matched, unmatched]` tuple.
 * A type guard narrows both arrays.
 * @example
 * iterablePartition(new Set([1, 2, 3, 4]), (value) => value % 2 === 0);
 * // [[2, 4], [1, 3]]
 * @example
 * // A type guard narrows both arrays
 * iterablePartition([1, 'a', 2], (value) => typeof value === 'number');
 * // [[1, 2], ['a']] (typed `[number[], string[]]`)
 */
export function iterablePartition<T, Matched extends T>(
  iterable: Iterable<T>,
  predicate: (value: T, index: number) => value is Matched,
): [matched: Matched[], unmatched: Exclude<T, Matched>[]];
export function iterablePartition<T>(
  iterable: Iterable<T>,
  predicate: (value: T, index: number) => boolean,
): [matched: T[], unmatched: T[]];
export function iterablePartition<T>(
  iterable: Iterable<T>,
  predicate: (value: T, index: number) => boolean,
): [matched: T[], unmatched: T[]] {
  return partition(iterable[Symbol.iterator](), predicate);
}
