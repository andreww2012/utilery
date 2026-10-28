import {remove} from 'es-toolkit/array';

/**
 * **Mutates** `array`, removing every element the predicate returns `true` for, and returns the
 * removed elements
 */
export const arrayPurgeBy: {
  /**
   * **Mutates** `array`, removing every element the predicate returns `true`
   * for, and returns the removed elements.
   * To keep `array` untouched, use `Array.prototype.filter` instead.
   * @param array - The array to mutate.
   * @param shouldRemove - Returns `true` for the elements to remove.
   * Receives the element, its index and a copy of the array as it was before the call.
   * @returns A new array of the removed elements, in their original order.
   * @example
   * const numbers = [1, 2, 3, 4, 5];
   * arrayPurgeBy(numbers, (value) => value % 2 === 0);
   * // [2, 4]
   * numbers;
   * // [1, 3, 5]
   */
  <T>(array: T[], shouldRemove: (value: T, index: number, array: T[]) => boolean): T[];
} = remove;
