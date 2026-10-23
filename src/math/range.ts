import {range as rangeBigint} from 'es-toolkit/bigint';
import {range as rangeNumber} from 'es-toolkit/math';

/**
 * Creates an array of numbers or bigints from `start` (inclusive) to `end`
 * (exclusive), incrementing by `step`.
 * When only one argument is passed, it is `end` and `start` is `0`.
 * A negative `step` creates a descending range.
 *
 * All arguments must be of the same type: either all numbers or all bigints.
 * Throws when `step` is `0` (or not an integer for numbers).
 * @param start - The first value (inclusive), or `end` when it is the only argument.
 * @param end - The end of the range (exclusive).
 * @param step - The increment between values.
 * Defaults to `1`.
 * @returns A new array with the values of the range.
 * @example
 * range(4);
 * // [0, 1, 2, 3]
 * @example
 * range(1, 4);
 * // [1, 2, 3]
 * @example
 * range(0, 20, 5);
 * // [0, 5, 10, 15]
 * @example
 * // Bigints
 * range(1n, 4n);
 * // [1n, 2n, 3n]
 */
export function range(start: number, end: number, step?: number): number[];
export function range(end: number): number[];
// eslint-disable-next-line ts/unified-signatures -- separate signatures keep the parameter names clear
export function range(start: bigint, end: bigint, step?: bigint): bigint[];
export function range(end: bigint): bigint[];
export function range(
  start: number | bigint,
  end?: number | bigint,
  step?: number | bigint,
): number[] | bigint[] {
  // The overloads guarantee every argument has the type of `start`, and both
  // implementations treat nullish optional arguments as missing
  return typeof start === 'bigint'
    ? rangeBigint(start, end as bigint, step as bigint)
    : rangeNumber(start, end as number, step as number);
}
