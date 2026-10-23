import {combinations} from 'es-toolkit/array';

/** Returns all combinations of `size` elements of an array, without repetition */
export const arrayCombinations: {
  /**
   * Returns all combinations of `size` elements of an array, without repetition:
   * the order of elements inside a combination does not matter, so `[a, b]` and
   * `[b, a]` are the same combination.
   * Combinations come in lexicographic order of the element positions.
   * Elements are told apart by position, not by value, so repeated values in the
   * array give combinations that look the same.
   * There are `n! / (size! * (n - size)!)` combinations for an array of `n`
   * elements, and none when `size > n`.
   * @param array - The array to pick the elements from.
   * Not mutated.
   * @param size - How many elements each combination has.
   * @returns A new array of combinations, each a new array of `size` elements.
   * @throws {Error} When `size` is not a non-negative integer.
   * @example
   * arrayCombinations(['a', 'b', 'c', 'd'], 2);
   * // [['a', 'b'], ['a', 'c'], ['a', 'd'], ['b', 'c'], ['b', 'd'], ['c', 'd']]
   * @example
   * arrayCombinations([1, 2, 3], 0);
   * // [[]]
   * @example
   * arrayCombinations([1, 2], 5);
   * // []
   */
  <T>(array: readonly T[], size: number): T[][];
} = combinations;
