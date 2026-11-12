import {clamp as clampBigint} from 'es-toolkit/bigint';
import {clamp as clampNumber} from 'es-toolkit/math';

/**
 * Clamps a number or a bigint to the inclusive `[minimum, maximum]` range.
 * When only one bound is passed, it is the upper bound and the result is the
 * smaller of `value` and `maximum`.
 *
 * All arguments must be of the same type: either all numbers or all bigints.
 * @param value - The value to clamp.
 * @param minimum - The inclusive lower bound (or the upper bound when it is the only bound).
 * @param maximum - The inclusive upper bound.
 * @returns `value` clamped to the bounds, of the same type as `value`.
 * @example
 * clamp(20, 5, 15);
 * // 15
 * @example
 * clamp(2, 5, 15);
 * // 5
 * @example
 * // Only the upper bound
 * clamp(10, 5);
 * // 5
 * @example
 * // Bigints
 * clamp(20n, 5n, 15n);
 * // 15n
 */
export function clamp(value: number, minimum: number, maximum: number): number;
export function clamp(value: number, maximum: number): number;
// eslint-disable-next-line ts/unified-signatures -- separate signatures keep the parameter names clear
export function clamp(value: bigint, minimum: bigint, maximum: bigint): bigint;
export function clamp(value: bigint, maximum: bigint): bigint;
export function clamp(
  value: number | bigint,
  bound1: number | bigint,
  bound2?: number | bigint,
): number | bigint {
  /* eslint-disable un/no-type-assertion -- the overloads guarantee every argument has the
  type of `value`, and both implementations treat a nullish last bound as missing */
  return typeof value === 'bigint'
    ? clampBigint(value, bound1 as bigint, bound2 as bigint)
    : clampNumber(value, bound1 as number, bound2 as number);
  /* eslint-enable un/no-type-assertion */
}
