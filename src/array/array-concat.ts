import {arrayConcat as arrayConcatBase} from 'ts-extras';

interface ArrayConcat {
  /**
   * Copies an array, like `Array.prototype.concat` with no arguments, but typed
   * as a mutable array of the elements.
   * @param array - The array to copy.
   * Not mutated.
   * @returns A new array with the same elements.
   * Holes are kept.
   * @example
   * arrayConcat(['a', 'b'] as const);
   * // ['a', 'b'] (type: ('a' | 'b')[])
   */
  <T extends readonly unknown[]>(array: T): T extends readonly (infer U)[] ? U[] : never;

  /**
   * Joins arrays into a new array, like `Array.prototype.concat`, but typed as an
   * array of the elements of all of them.
   * The native method fails to type-check when the arrays have different
   * element types, and types the result after the first array only.
   * Unlike the native method, each argument after the first must be an array.
   * @param array - The first array.
   * Not mutated.
   * @param items - The arrays to add after it.
   * Not mutated.
   * @returns A new array with the elements of all the arrays, in order.
   * Holes are kept.
   * @example
   * arrayConcat(['a', 'b'], [1, 2]);
   * // ['a', 'b', 1, 2] (type: (string | number)[])
   * @example
   * arrayConcat([], ['hello']);
   * // ['hello'] (type: string[])
   */
  <T extends readonly unknown[], U extends readonly (readonly unknown[])[]>(
    array: T,
    ...items: U
  ): ReturnType<typeof arrayConcatBase<T, U>>;
}

/** Joins arrays into a new array, typed as an array of the elements of all of them */
export const arrayConcat: ArrayConcat = arrayConcatBase;
