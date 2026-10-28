import {pullAt} from 'es-toolkit/array';

/**
 * **Mutates** `array`, removing the elements at the given indexes, and returns the removed
 * elements
 */
export const arrayPurgeIndexes: {
  /**
   * **Mutates** `array`, removing the elements at the given indexes, and returns
   * the removed elements.
   * Negative indexes count from the end of the array.
   * @param array - The array to mutate.
   * @param indexes - The indexes of the elements to remove.
   * @returns A new array of the removed elements, in the order of `indexes`.
   * An index past the end gives `undefined` and removes nothing.
   * An index below `-array.length` gives `undefined` too, but still removes an element, counted
   * from the end once more.
   * @example
   * const numbers = [10, 20, 30, 40, 50];
   * arrayPurgeIndexes(numbers, [1, 3, -1]);
   * // [20, 40, 50]
   * numbers;
   * // [10, 30]
   */
  <T>(array: T[], indexes: readonly number[]): T[];
} = pullAt;
