import {map} from 'remeda';

/**
 * Maps each element of an array through `callback`, just like
 * `Array.prototype.map`, but preserves the *tuple structure* of the input in
 * the return type: mapping a fixed-length tuple yields a tuple of the same
 * length (rather than a widened `U[]`).
 * Regular arrays still map to `U[]`.
 *
 * This is the one thing native `array.map` cannot express at the type level,
 * and the only reason this util exists.
 * @param array - The array (or tuple) to map.
 * Not mutated.
 * @param callback - Produces each output element.
 * Receives the value, its index, and the source array.
 * @returns A new array of mapped elements, tuple-preserving when the input is a tuple.
 * @example
 * // Regular array: maps to `U[]`
 * arrayMap([1, 2, 3], (value) => value * 2);
 * // [2, 4, 6]
 * @example
 * // Tuple input: length is preserved in the type (`[string, string, string]`)
 * arrayMap(['a', 'b', 'c'] as const, (value) => value.toUpperCase());
 * // ['A', 'B', 'C']
 * @example
 * // The callback receives the index and the source array too
 * arrayMap([10, 20, 30], (value, index) => value + index);
 * // [10, 21, 32]
 */
export const arrayMap = <T extends readonly unknown[], U>(
  array: T,
  callback: (value: T[number], index: number, array: T) => U,
) => map(array, callback);
