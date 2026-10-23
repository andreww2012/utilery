import {scan} from 'es-toolkit/iterator';

/**
 * Lazily yields the running accumulation of an iterable, like `reduce` that
 * emits every intermediate result.
 * `initialValue` is yielded first, then the accumulator after each element, so
 * `n` elements give `n + 1` values.
 * @param iterable - The iterable to accumulate over.
 * @param reducer - Called with `(accumulator, value, index)`; returns the next accumulator.
 * @param initialValue - The initial accumulator, yielded first.
 * @returns A lazy iterator over the initial value and every following accumulator.
 * @example
 * // Running total
 * [...iterableScan([1, 2, 3], (total, value) => total + value, 0)];
 * // [0, 1, 3, 6]
 */
export const iterableScan = <T, A>(
  iterable: Iterable<T>,
  reducer: (accumulator: A, value: T, index: number) => A,
  initialValue: A,
) => scan(iterable[Symbol.iterator](), reducer, initialValue);
