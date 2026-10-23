import {isInteger as isIntegerBase} from 'ts-extras';
import type {EnsureInteger} from '../types/ensure-integer.ts';

/** Checks whether a number is an integer, like `Number.isInteger` */
export const isInteger: {
  /**
   * Checks whether a number is an integer, like `Number.isInteger`.
   * As a type guard, it narrows a number literal type that is not an integer to
   * `never`.
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
  <T extends number>(value: T): value is EnsureInteger<T>;
} = isIntegerBase;
