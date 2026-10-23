import {dropWhile} from 'es-toolkit/iterator';

/**
 * Lazily skips the leading elements of an iterable while `predicate` returns
 * `true`, then yields every remaining element (the predicate is not called
 * again).
 *
 * The lazy counterpart of `array/arrayDrop` with a predicate.
 * @param iterable - The iterable to skip elements of.
 * @param predicate - Called with `(value, index)`; returns `true` to skip the element.
 * @returns A lazy iterator over the elements after the skipped ones.
 * @example
 * [...iterableDropWhile([1, 2, 3, 1], (value) => value < 3)];
 * // [3, 1]
 */
export const iterableDropWhile = <T>(
  iterable: Iterable<T>,
  predicate: (value: T, index: number) => boolean,
): IteratorObject<T, undefined> => dropWhile(iterable[Symbol.iterator](), predicate);
