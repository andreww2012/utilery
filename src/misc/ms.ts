import {ms as msBase} from 'ms-ts';

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
// eslint-disable-next-line unicorn/prefer-export-from -- re-declared to attach rewritten JSDoc; an `export ... from` would inherit the upstream docs
export const ms = msBase;
