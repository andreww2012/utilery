import {head} from 'es-toolkit/iterator';

/**
 * Returns the first element of an iterable, consuming only that element.
 * The underlying iterator is closed afterward, so a generator runs its
 * `finally` blocks.
 * @param iterable - The iterable to take the first element of.
 * @returns The first element, or `undefined` if the iterable is empty.
 * @example
 * iterableFirst(new Set(['a', 'b']));
 * // 'a'
 * @example
 * iterableFirst([]);
 * // undefined
 */
export const iterableFirst = <T>(iterable: Iterable<T>): T | undefined =>
  head(iterable[Symbol.iterator]());
