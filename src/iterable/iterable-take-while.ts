import {takeWhile} from 'es-toolkit/iterator';

/**
 * Lazily yields the leading elements of an iterable while `predicate` returns
 * `true`, and stops at the first element for which it returns `false`.
 * Safe to use on infinite iterables.
 *
 * The lazy counterpart of `array/arrayTakeWhile`.
 * @param iterable - The iterable to take elements of.
 * @param predicate - Called with `(value, index)`; returns `true` to keep going.
 * @returns A lazy iterator over the leading matching elements.
 * @example
 * [...iterableTakeWhile([1, 2, 3, 1], (value) => value < 3)];
 * // [1, 2]
 * @example
 * // Bound an infinite sequence
 * [...iterableTakeWhile(generateSequence(1, (value) => value * 3), (value) => value < 100)];
 * // [1, 3, 9, 27, 81]
 */
export const iterableTakeWhile = <T>(
  iterable: Iterable<T>,
  predicate: (value: T, index: number) => boolean,
): IteratorObject<T, undefined> => takeWhile(iterable[Symbol.iterator](), predicate);
