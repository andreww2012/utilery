import {isInteger as isIntegerBase} from 'ts-extras';

/** Checks whether a number is an integer, like `Number.isInteger` */
export const isInteger: {
  /**
   * Checks whether a number is an integer, like `Number.isInteger`.
   * For integers that can be represented exactly, use `isSafeInteger`.
   * @param value - The number to check.
   * @returns `true` if `value` is an integer, otherwise `false`.
   * @example
   * isInteger(42);
   * // true
   * isInteger(1.5);
   * // false
   * isInteger(2 ** 60);
   * // true
   */
  (value: number): boolean;
} = isIntegerBase;
