import {cartesianProduct} from 'es-toolkit/iterator';

/**
 * Lazily yields every tuple made by picking one element from each iterable (the
 * Cartesian product), in lexicographic order: the last iterable changes
 * fastest.
 * Yields a single empty tuple when no iterables are passed, and nothing when
 * any of them is empty.
 *
 * Every iterable except the first one is read into an array when iteration
 * starts, as it is traversed many times.
 * The first one is read lazily, so it may be infinite.
 *
 * The lazy counterpart of `array/cartesianProduct`.
 * @param iterables - The iterables to combine.
 * @returns A lazy iterator over the tuples of the product.
 * @example
 * [...iterableCartesianProduct([1, 2], ['a', 'b'])];
 * // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
 */
export const iterableCartesianProduct = <T extends unknown[]>(
  ...iterables: {[K in keyof T]: Iterable<T[K]>}
) =>
  // The upstream types can't infer the tuple from the iterators built here
  cartesianProduct(...iterables.map((iterable) => iterable[Symbol.iterator]())) as IteratorObject<
    T,
    undefined
  >;
