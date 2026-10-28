import {isLength} from 'es-toolkit/predicate';

/**
 * Checks whether a value is a valid length of an array-like value: an integer from `0` to
 * `Number.MAX_SAFE_INTEGER`
 */
export const isValidLength: {
  /**
   * Checks whether a value is a valid length of an array-like value: an integer
   * from `0` to `Number.MAX_SAFE_INTEGER`.
   * @param value - The value to check.
   * @returns `true` if `value` is a valid length, otherwise `false`.
   * @example
   * isValidLength(0);
   * // true
   * isValidLength(42);
   * // true
   * isValidLength(-1);
   * // false
   * isValidLength(1.5);
   * // false
   * isValidLength(2 ** 53);
   * // false (greater than `Number.MAX_SAFE_INTEGER`)
   */
  (value?: unknown): boolean;
} = isLength;
