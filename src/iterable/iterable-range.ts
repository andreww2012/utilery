import {range} from 'es-toolkit/iterator';

/**
 * Lazily yields numbers from `start` (inclusive) to `end` (exclusive),
 * incrementing by `step`.
 * When only one argument is passed, it is `end` and `start` is `0`.
 * A negative `step` creates a descending range.
 *
 * The lazy counterpart of `math/range`: no numbers are computed until the
 * iterator is consumed, so `end` can be `Infinity`.
 * @param start - The first number (inclusive), or `end` when it is the only argument.
 * @param end - The end of the range (exclusive).
 * @param step - The increment between numbers.
 * Defaults to `1`.
 * @returns A lazy iterator over the numbers of the range.
 * @example
 * [...iterableRange(4)];
 * // [0, 1, 2, 3]
 * @example
 * [...iterableRange(0, 20, 5)];
 * // [0, 5, 10, 15]
 * @example
 * // Infinite range, bounded by the consumer
 * iterableFirst(iterableDropWhile(iterableRange(1, Infinity), (value) => value ** 2 < 50));
 * // 8
 */
// eslint-disable-next-line unicorn/prefer-export-from -- re-declared to attach rewritten JSDoc; an `export ... from` would inherit the upstream docs
export const iterableRange = range;
