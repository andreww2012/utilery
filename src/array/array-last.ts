import {arrayLast as arrayLastBase} from 'ts-extras';
import type {ArrayLastElement} from '../types/array-last-element.ts';

interface ArrayLast {
  /**
   * Returns the last element of a non-empty tuple, typed precisely.
   * @param array - The tuple.
   * @returns The last element.
   * @example
   * arrayLast(['abc', 123, true] as const);
   * // true (type: true)
   */
  <const ArrayType extends readonly [...unknown[], unknown]>(
    array: ArrayType,
  ): ArrayLastElement<ArrayType>;

  /**
   * Returns the last element of an array.
   * @param array - The array.
   * @returns The last element, or `undefined` for an empty array.
   * @example
   * arrayLast(['a', 'b', 'c']);
   * // 'c' (type: string | undefined)
   * arrayLast([]);
   * // undefined
   */
  <ArrayType extends readonly unknown[]>(array: ArrayType): ArrayType[number] | undefined;
}

/**
 * Returns the last element of an array, typed precisely for tuples.
 * For the first element, use `arrayFirst`
 */
export const arrayLast: ArrayLast = arrayLastBase;
