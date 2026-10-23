import {identity} from 'es-toolkit/function';
import {uniqBy} from 'es-toolkit/iterator';

/**
 * Lazily yields the elements of an iterable, skipping the ones seen before
 * (`SameValueZero` comparison, like `Set`).
 * Pass `mapper` to compare elements by a derived key instead.
 * The first occurrence is kept.
 *
 * Each element is yielded as soon as it is found to be unique, so this works on
 * infinite iterables too.
 * The lazy counterpart of `array/arrayUnique`.
 * @param iterable - The iterable to deduplicate.
 * @param mapper - Optional function that returns the key to compare.
 * @returns A lazy iterator over the unique elements.
 * @example
 * [...iterableUnique([1, 2, 1, 3, 2])];
 * // [1, 2, 3]
 * @example
 * // Deduplicate by a derived key
 * [...iterableUnique([1.1, 1.2, 2.3, 2.4], Math.floor)];
 * // [1.1, 2.3]
 */
export const iterableUnique = <T>(
  iterable: Iterable<T>,
  mapper: (value: T) => unknown = identity,
): IteratorObject<T, undefined> => uniqBy(iterable[Symbol.iterator](), mapper);
