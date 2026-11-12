import {isFinite} from 'ts-extras';

/**
 * Checks whether a number is finite, like `Number.isFinite`: not `NaN`, `Infinity` or `-Infinity`.
 */
export const isFiniteNumber: {
  /**
   * Checks whether a number is finite, like `Number.isFinite`: not `NaN`,
   * `Infinity` or `-Infinity`.
   * @param value - The number to check.
   * @returns `true` if `value` is a finite number, otherwise `false`.
   * @example
   * isFiniteNumber(42);
   * // true
   * isFiniteNumber(Number.POSITIVE_INFINITY);
   * // false
   * isFiniteNumber(Number.NaN);
   * // false
   */
  (value: number): boolean;
} = isFinite;
