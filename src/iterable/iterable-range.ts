import {range} from 'es-toolkit/iterator';

interface IterableRange {
  /**
   * Lazily yields the numbers from `0` (inclusive) to `end` (exclusive).
   * @param end - The end of the range (exclusive).
   * @returns A lazy iterator over the numbers of the range.
   * @example
   * [...iterableRange(4)];
   * // [0, 1, 2, 3]
   */
  (end: number): IteratorObject<number, undefined>;

  /**
   * Lazily yields the numbers from `start` (inclusive) to `end` (exclusive),
   * incrementing by `1`.
   * @param start - The first number (inclusive).
   * @param end - The end of the range (exclusive).
   * @returns A lazy iterator over the numbers of the range.
   * @example
   * [...iterableRange(2, 5)];
   * // [2, 3, 4]
   * @example
   * // Infinite range, bounded by the consumer
   * iterableFirst(iterableDropWhile(iterableRange(1, Infinity), (value) => value ** 2 < 50));
   * // 8
   */
  (start: number, end: number): IteratorObject<number, undefined>;

  /**
   * Lazily yields the numbers from `start` (inclusive) to `end` (exclusive),
   * incrementing by `step`.
   * A negative `step` creates a descending range.
   * @param start - The first number (inclusive).
   * @param end - The end of the range (exclusive).
   * @param step - The increment between numbers.
   * @returns A lazy iterator over the numbers of the range.
   * @throws {Error} When `step` is not a non-zero integer.
   * @example
   * [...iterableRange(0, 20, 5)];
   * // [0, 5, 10, 15]
   * @example
   * [...iterableRange(3, 0, -1)];
   * // [3, 2, 1]
   */
  (start: number, end: number, step: number): IteratorObject<number, undefined>;
}

/**
 * Lazily yields numbers from `start` (inclusive) to `end` (exclusive),
 * incrementing by `step`.
 * When only one argument is passed, it is `end` and `start` is `0`.
 * A negative `step` creates a descending range.
 *
 * The lazy counterpart of `range`: no numbers are computed until the iterator
 * is consumed, so `end` can be `Infinity`.
 */
export const iterableRange: IterableRange = range;
