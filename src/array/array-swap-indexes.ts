// cspell:ignore SwappedIndices
import {type SwappedIndices, swapIndices} from 'remeda';

/**
 * Returns a copy of `array` with the elements at `index1` and `index2` swapped.
 * The return type is **tuple-preserving**, so swapping two literal indexes of a
 * fixed-length tuple yields a tuple whose element *types* are swapped at those
 * positions.
 *
 * Negative indexes count from the end (like `Array#at`).
 * A `NaN` or out-of-bounds index leaves the copy unchanged.
 * @param array - The array (or tuple) to copy and swap within.
 * Not mutated.
 * @param index1 - The first index.
 * Negative counts from the end.
 * @param index2 - The second index.
 * Negative counts from the end.
 * @returns A new array with the two elements swapped.
 * @example
 * // Swap two elements
 * arraySwapIndexes([1, 2, 3, 4], 0, 2);
 * // [3, 2, 1, 4]
 * @example
 * // Tuple input: element types are swapped at those positions in the type
 * arraySwapIndexes(['a', 1, true] as const, 0, 2);
 * // [true, 1, 'a']
 * @example
 * // Negative indexes count from the end
 * arraySwapIndexes([1, 2, 3, 4], 0, -1);
 * // [4, 2, 3, 1]
 * @example
 * // An out-of-bounds index leaves the copy unchanged
 * arraySwapIndexes([1, 2, 3], 0, 10);
 * // [1, 2, 3]
 */
export const arraySwapIndexes = <
  T extends readonly unknown[],
  Index1 extends number,
  Index2 extends number,
>(
  array: T,
  index1: Index1,
  index2: Index2,
): SwappedIndices<T, Index1, Index2> => swapIndices(array, index1, index2);
