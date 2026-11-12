import {isSafeInteger as isSafeIntegerBase} from 'ts-extras';

/**
 * Checks whether a number is a safe integer, like `Number.isSafeInteger`: an integer from
 * `Number.MIN_SAFE_INTEGER` to `Number.MAX_SAFE_INTEGER`, which can be represented exactly
 */
export const isSafeInteger: {
  /**
   * Checks whether a number is a safe integer, like `Number.isSafeInteger`: an
   * integer from `Number.MIN_SAFE_INTEGER` to `Number.MAX_SAFE_INTEGER`, which can
   * be represented exactly.
   * @param value - The number to check.
   * @returns `true` if `value` is a safe integer, otherwise `false`.
   * @example
   * isSafeInteger(42);
   * // true
   * isSafeInteger(1.5);
   * // false
   * isSafeInteger(2 ** 60);
   * // false
   */
  (value: number): boolean;
} = isSafeIntegerBase;
