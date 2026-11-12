import {arrayFirst as arrayFirstBase} from 'ts-extras';

interface ArrayFirst {
  /**
   * Returns the first element of a non-empty tuple, typed precisely.
   * @param array - The tuple.
   * @returns The first element.
   * @example
   * arrayFirst(['abc', 123, true] as const);
   * // 'abc' (type: 'abc')
   */
  <const ArrayType extends readonly [unknown, ...unknown[]]>(array: ArrayType): ArrayType[0];

  /**
   * Returns the first element of a tuple that ends with a required element, like
   * `[...string[], number]`, so it is never empty.
   * @param array - The tuple.
   * @returns The first element.
   * @example
   * declare const values: [...string[], number];
   * arrayFirst(values);
   * // type: string | number
   */
  <const ArrayType extends readonly [...unknown[], unknown]>(array: ArrayType): ArrayType[0];

  /**
   * Returns the first element of an array.
   * @param array - The array.
   * @returns The first element, or `undefined` for an empty array.
   * @example
   * arrayFirst(['a', 'b', 'c']);
   * // 'a' (type: string | undefined)
   * arrayFirst([]);
   * // undefined
   */
  <ArrayType extends readonly unknown[]>(array: ArrayType): ArrayType[number] | undefined;
}

/**
 * Returns the first element of an array, typed precisely for tuples.
 * For the last element, use `arrayLast`
 */
export const arrayFirst: ArrayFirst = arrayFirstBase;
