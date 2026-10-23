import {isInfinite as isInfiniteBase} from 'ts-extras';
import type {NegativeInfinity} from '../types/negative-infinity.ts';
import type {PositiveInfinity} from '../types/positive-infinity.ts';

/** Checks whether a value is `Infinity` or `-Infinity` */
export const isInfinite: {
  /**
   * Checks whether a value is `Infinity` or `-Infinity`.
   * `NaN` is not infinite.
   * @param value - The value to check.
   * @returns `true` if `value` is `Infinity` or `-Infinity`, otherwise `false`.
   * @example
   * isInfinite(Number.POSITIVE_INFINITY);
   * // true
   * isInfinite(Number.NEGATIVE_INFINITY);
   * // true
   * isInfinite(42);
   * // false
   * isInfinite(Number.NaN);
   * // false
   */
  (value: unknown): value is NegativeInfinity | PositiveInfinity;
} = isInfiniteBase;
