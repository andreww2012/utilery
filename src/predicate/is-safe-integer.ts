import {isSafeInteger as isSafeIntegerBase} from 'ts-extras';
import type {EnsureInteger} from '../types/ensure-integer.ts';

/**
 * Checks whether a number is a safe integer, like `Number.isSafeInteger`: an integer from
 * `Number.MIN_SAFE_INTEGER` to `Number.MAX_SAFE_INTEGER`, which can be represented exactly.
 */
export const isSafeInteger: {
  /**
   * Checks whether a number is a safe integer, like `Number.isSafeInteger`: an
   * integer from `Number.MIN_SAFE_INTEGER` to `Number.MAX_SAFE_INTEGER`, which can
   * be represented exactly.
   * As a type guard, it narrows a number literal type that is not an integer to
   * `never`.
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
  <T extends number>(value: T): value is EnsureInteger<T>;
} = isSafeIntegerBase;
