import {zip} from 'es-toolkit/iterator';

/**
 * Lazily pairs up the elements at the same positions of several iterables: the
 * `n`-th tuple holds the `n`-th element of every iterable (a "zip").
 * Iteration stops as soon as the **shortest** iterable ends, so infinite
 * iterables are fine as long as one of them is finite.
 * Every iterator is closed when iteration ends.
 *
 * The lazy counterpart of `array/arrayTranspose`, which pads to the longest
 * array instead.
 * @param iterables - The iterables to pair up.
 * @returns A lazy iterator over tuples of the elements at matching positions.
 * @example
 * [...iterableTranspose([[1, 2, 3], ['a', 'b']])];
 * // [[1, 'a'], [2, 'b']]
 * @example
 * // Number the elements of a set
 * [...iterableTranspose([iterableRange(1, Infinity), new Set(['x', 'y'])])];
 * // [[1, 'x'], [2, 'y']]
 */
export const iterableTranspose = <T extends unknown[] | []>(iterables: {
  readonly [K in keyof T]: Iterable<T[K]>;
}) =>
  // The upstream types can't infer the tuple from the iterators built here
  zip(...iterables.map((iterable) => iterable[Symbol.iterator]())) as IteratorObject<T, undefined>;
