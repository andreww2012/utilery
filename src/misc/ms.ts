import {type AllUnits, ms as msBase} from 'ms-ts';
import type {Ms} from '../types/ms.ts';

/** Identity function that accepts a duration in milliseconds and returns it unchanged */
export const ms: {
  /**
   * Identity function that accepts a duration in milliseconds and returns it
   * unchanged.
   * Pass the duration string as the generic parameter to enforce the
   * correct value at compile time.
   *
   * Handles integer and floating point numbers, leading and trailing whitespace,
   * and negative numbers.
   *
   * See `Ms` for more details and examples.
   * @param milliseconds - The duration in milliseconds, checked against the generic parameter.
   * @returns The `milliseconds` argument, unchanged.
   * @example
   * // Enforce a specific duration value
   * const durationMs = ms<'42m'>(2_520_000);
   * @example
   * // Negative and floating-point durations
   * const durationMs = ms<'-3.14d'>(-271_296_000);
   */
  <S extends `${number}${AllUnits}`>(milliseconds: Ms<S>): Ms<S>;
} = msBase;
