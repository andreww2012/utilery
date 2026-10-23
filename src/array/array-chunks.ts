import {chunk} from 'es-toolkit/array';
import {chunkBy} from 'es-toolkit/fp';
import type {MaybeReadonlyArray} from '../types/maybe-readonly-array.ts';
import {arrayMapWithAccumulator} from './array-map-with-accumulator.ts';

const isValidChunkSize = (size: number) =>
  size === Number.POSITIVE_INFINITY || (Number.isSafeInteger(size) && size >= 0);

const chunkBySizes = <T>(array: readonly T[], sizes: readonly number[]) => {
  const invalidSize = sizes.find((size) => !isValidChunkSize(size));
  if (invalidSize != null) {
    throw new RangeError(
      `Expected chunk sizes to be non-negative integers or Infinity, got ${invalidSize}`,
    );
  }

  const ends = arrayMapWithAccumulator(sizes, (end, size) => end + size, 0);
  return ends.map((end, i) => array.slice(ends[i - 1] || 0, end));
};

/**
 * Splits an array into consecutive chunks of at most `size` elements.
 * To give each chunk its own size, or to split by a key, pass an array of
 * sizes or a key function as the second argument.
 * @param array - The array to split.
 * Not mutated.
 * @param size - A positive integer chunk size.
 * @returns A new two-dimensional array of chunks.
 * @throws {Error} When `size` is not a positive integer.
 * @example
 * arrayChunks([1, 2, 3, 4, 5], 2);
 * // [[1, 2], [3, 4], [5]]
 */
export function arrayChunks<T>(array: readonly T[], size: number): T[][];

/**
 * Splits an array into exactly one chunk per size, in order.
 * A chunk is shorter (or empty) when the array runs out, and the elements past
 * the sum of the sizes are left out.
 * Use `Infinity` as the last size to collect the rest.
 * @param array - The array to split.
 * Not mutated.
 * @param sizes - The chunk sizes: non-negative integers or `Infinity`.
 * A literal tuple of sizes gives a tuple of chunks.
 * @returns A new array with one chunk per size.
 * @throws {RangeError} When one of the chunk sizes is not a non-negative integer or `Infinity`.
 * @example
 * arrayChunks([1, 2, 3, 4, 5, 6], [1, 3, 0]);
 * // [[1], [2, 3, 4], []]
 * @example
 * // The rest of the elements in the last chunk
 * arrayChunks([1, 2, 3, 4, 5], [2, Infinity]);
 * // [[1, 2], [3, 4, 5]]
 */
export function arrayChunks<T, const Sizes extends readonly number[]>(
  array: readonly T[],
  sizes: Sizes,
): {-readonly [K in keyof Sizes]: T[]};

/**
 * Splits an array into the runs of consecutive elements with the same key.
 * A new chunk is started whenever an element's key differs from the previous
 * element's key by strict inequality.
 * @param array - The array to split.
 * Not mutated.
 * @param iteratee - Maps an element to its comparison key.
 * @returns A new two-dimensional array of chunks.
 * @example
 * arrayChunks([1, 1, 2, 3, 3], (value) => value);
 * // [[1, 1], [2], [3, 3]]
 * @example
 * arrayChunks(
 *   [{type: 'a'}, {type: 'a'}, {type: 'b'}, {type: 'a'}],
 *   (item) => item.type,
 * );
 * // [[{type: 'a'}, {type: 'a'}], [{type: 'b'}], [{type: 'a'}]]
 */
export function arrayChunks<T>(array: readonly T[], iteratee: (value: T) => unknown): T[][];
export function arrayChunks<T>(
  array: readonly T[],
  sizeOrIteratee: MaybeReadonlyArray<number> | ((value: T) => unknown),
): T[][] {
  if (typeof sizeOrIteratee === 'function') {
    return chunkBy(sizeOrIteratee)(array);
  }

  return typeof sizeOrIteratee === 'number'
    ? chunk(array, sizeOrIteratee)
    : chunkBySizes(array, sizeOrIteratee);
}
