import {move} from '@antfu/utils';

/** **Mutates** `array`, moving the element at index `from` to index `to`, and returns it */
export const arrayMove: {
  /**
   * **Mutates** `array`, moving the element at index `from` to index `to`, and
   * returns it.
   * The elements in between shift by one position.
   * Negative indexes count from the end of the array, like with
   * `Array.prototype.splice`.
   * A negative `to` counts from the end of the array without the moved element,
   * so `-1` puts it before the last element: to move it to the end, pass
   * `array.length - 1`.
   * `from` must be an index of an existing element: otherwise `undefined` is
   * inserted at `to`.
   * @param array - The array to mutate.
   * @param from - The index of the element to move.
   * @param to - The index to insert the element at, once it is removed from
   * `from`.
   * @returns The mutated input `array`.
   * @example
   * arrayMove(['a', 'b', 'c', 'd'], 0, 2);
   * // ['b', 'c', 'a', 'd']
   * @example
   * arrayMove(['a', 'b', 'c', 'd'], -1, 0);
   * // ['d', 'a', 'b', 'c']
   */
  <T>(array: T[], from: number, to: number): T[];
} = move;
