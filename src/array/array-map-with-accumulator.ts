import {mapWithFeedback} from 'remeda';

/**
 * Like {@link arrayMap}, but threads an accumulator through the iteration: each
 * output element is the accumulator value *after* processing the corresponding
 * input element (a prefix scan).
 * Unlike a `reduce`, which yields only the final accumulator, this returns every
 * intermediate state, so the result has the same length as the input (and is
 * tuple-preserving for tuples).
 * @param array - The array (or tuple) to scan.
 * Not mutated.
 * @param callback - Computes the next accumulator from the current one and the element.
 * Receives the accumulator, the value, its index, and the source array.
 * @param initialValue - The accumulator seed used before the first element.
 * @returns An array of the successive accumulator values, one per input element.
 * @example
 * // Running sum
 * arrayMapWithAccumulator([1, 2, 3, 4], (accumulator, value) => accumulator + value, 0);
 * // [1, 3, 6, 10]
 * @example
 * // Running maximum
 * arrayMapWithAccumulator([3, 1, 4, 1, 5], (accumulator, value) => Math.max(accumulator, value), -Infinity);
 * // [3, 3, 4, 4, 5]
 * @example
 * // The callback receives the index and the source array too
 * arrayMapWithAccumulator(['a', 'b', 'c'], (accumulator, value, index) => accumulator + value + index, '');
 * // ['a0', 'a0b1', 'a0b1c2']
 */
export const arrayMapWithAccumulator = <T extends readonly unknown[], Accumulator>(
  array: T,
  callback: (accumulator: Accumulator, value: T[number], index: number, array: T) => Accumulator,
  initialValue: Accumulator,
) => mapWithFeedback(array, callback, initialValue);
