import {chunk} from 'es-toolkit/iterator';

/**
 * Lazily splits an iterable into arrays of `size` elements.
 * The last chunk holds the remaining elements and may be shorter.
 *
 * The lazy counterpart of `array/arrayChunks`.
 * For overlapping or gapped windows, use `slidingWindow`.
 * @param iterable - The iterable to split.
 * @param size - The length of each chunk.
 * Must be a positive integer.
 * @returns A lazy iterator over the chunks.
 * @example
 * [...iterableChunks([1, 2, 3, 4, 5], 2)];
 * // [[1, 2], [3, 4], [5]]
 */
export const iterableChunks = <T>(iterable: Iterable<T>, size: number) =>
  chunk(iterable[Symbol.iterator](), size);
