import {rangeRight as rangeRightBigint} from 'es-toolkit/bigint';
import {rangeRight as rangeRightNumber} from 'es-toolkit/math';

/**
 * Like `range`, but the values go in reverse order: creates an array of numbers
 * or bigints from `end` (exclusive) down to `start` (inclusive), with `step`
 * between values.
 * When only one argument is passed, it is `end` and `start` is `0`.
 *
 * All arguments must be of the same type: either all numbers or all bigints.
 * Throws when `step` is `0` (or not an integer for numbers).
 * @param start - The last value (inclusive), or `end` when it is the only argument.
 * @param end - The end of the range (exclusive).
 * @param step - The increment between values.
 * Defaults to `1`.
 * @returns A new array with the values of the range in reverse order.
 * @example
 * rangeRight(4);
 * // [3, 2, 1, 0]
 * @example
 * rangeRight(1, 4);
 * // [3, 2, 1]
 * @example
 * rangeRight(0, 20, 5);
 * // [15, 10, 5, 0]
 * @example
 * // Bigints
 * rangeRight(1n, 4n);
 * // [3n, 2n, 1n]
 */
export function rangeRight(start: number, end: number, step?: number): number[];
export function rangeRight(end: number): number[];
// eslint-disable-next-line ts/unified-signatures -- separate signatures keep the parameter names clear
export function rangeRight(start: bigint, end: bigint, step?: bigint): bigint[];
export function rangeRight(end: bigint): bigint[];
export function rangeRight(
  start: number | bigint,
  end?: number | bigint,
  step?: number | bigint,
): number[] | bigint[] {
  // The overloads guarantee every argument has the type of `start`, and both
  // implementations treat nullish optional arguments as missing
  return typeof start === 'bigint'
    ? rangeRightBigint(start, end as bigint, step as bigint)
    : rangeRightNumber(start, end as number, step as number);
}
