import {arrayConcat as arrayConcatBase} from 'ts-extras';
import type {Primitive} from '../types/primitive.ts';

interface ArrayConcat {
  /**
   * Copies an array, like `Array.prototype.concat` with no arguments, but typed
   * as a mutable copy: a tuple stays a tuple.
   * @param array - The array to copy.
   * Not mutated.
   * @returns A new array with the same elements.
   * Holes are kept.
   * @example
   * arrayConcat(['a', 'b'] as const);
   * // ['a', 'b'] (type: ['a', 'b'])
   */
  <T extends readonly unknown[]>(array: T): [...T];

  /**
   * Joins arrays into a new array, like `Array.prototype.concat`, but typed as an
   * array of the elements of all of them.
   * The native method fails to type-check when the arrays have different
   * element types, and types the result after the first array only.
   * Unlike the native method, it accepts no objects after the first array, as
   * the native method adds some of them as is and spreads the others.
   * @param array - The first array.
   * Not mutated.
   * @param items - What to add after it: the elements of an array, or a primitive
   * as is.
   * Not mutated.
   * @returns A new array with the elements of the first array and the added
   * ones, in order.
   * Holes are kept.
   * @example
   * arrayConcat(['a', 'b'], [1, 2]);
   * // ['a', 'b', 1, 2] (type: (string | number)[])
   * @example
   * arrayConcat([], ['hello']);
   * // ['hello'] (type: string[])
   * @example
   * declare const count: number;
   * arrayConcat(['a'], count, [true]);
   * // type: (string | number | boolean)[]
   */
  <T extends readonly unknown[], U extends readonly (readonly unknown[] | Primitive)[]>(
    array: T,
    ...items: U
  ): ReturnType<typeof arrayConcatBase<T, U>>;
}

/** Joins arrays into a new array, typed as an array of the elements of all of them */
export const arrayConcat: ArrayConcat = arrayConcatBase;
