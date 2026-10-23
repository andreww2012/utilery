import {isFinite} from 'ts-extras';
import type {EnsureFinite} from '../types/ensure-finite.ts';

/**
 * Checks whether a number is finite, like `Number.isFinite`: not `NaN`, `Infinity` or `-Infinity`.
 */
export const isFiniteNumber: {
  /**
   * Checks whether a number is finite, like `Number.isFinite`: not `NaN`,
   * `Infinity` or `-Infinity`.
   * As a type guard, it narrows a number literal type that is not finite to
   * `never`.
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
  <T extends number>(value: T): value is EnsureFinite<T>;
} = isFinite;
