import {inRange as inRangeBigint} from 'es-toolkit/bigint';
import {inRange as inRangeNumber} from 'es-toolkit/math';

/**
 * Checks whether a number or a bigint is within the `[minimum, maximum)` range
 * (the lower bound is inclusive, the upper bound is exclusive).
 * When only one bound is passed, it is the upper bound and the lower bound is
 * `0`.
 *
 * All arguments must be of the same type: either all numbers or all bigints.
 * Throws when `minimum` is not less than `maximum`.
 * @param value - The value to check.
 * @param minimum - The inclusive lower bound (or the exclusive upper bound when it is the only
 * bound).
 * @param maximum - The exclusive upper bound.
 * @returns `true` if `value` is within the range, otherwise `false`.
 * @example
 * isInRange(3, 2, 5);
 * // true
 * @example
 * // The upper bound is exclusive
 * isInRange(5, 2, 5);
 * // false
 * @example
 * // Only the upper bound: the range is `[0, 5)`
 * isInRange(3, 5);
 * // true
 * @example
 * // Bigints
 * isInRange(3n, 2n, 5n);
 * // true
 */
export function isInRange(value: number, minimum: number, maximum: number): boolean;
export function isInRange(value: number, maximum: number): boolean;
// eslint-disable-next-line ts/unified-signatures -- separate signatures keep the parameter names clear
export function isInRange(value: bigint, minimum: bigint, maximum: bigint): boolean;
export function isInRange(value: bigint, maximum: bigint): boolean;
export function isInRange(
  value: number | bigint,
  bound1: number | bigint,
  bound2?: number | bigint,
): boolean {
  // The overloads guarantee every argument has the type of `value`, and both
  // implementations treat a nullish last bound as missing
  return typeof value === 'bigint'
    ? inRangeBigint(value, bound1 as bigint, bound2 as bigint)
    : inRangeNumber(value, bound1 as number, bound2 as number);
}
