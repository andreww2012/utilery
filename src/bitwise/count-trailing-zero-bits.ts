import {ctz32} from '@thi.ng/binary/count';

/**
 * Counts the `0` bits below the lowest `1` bit in the 32-bit integer
 * representation of `value`.
 * In other words, gives the index of the lowest set bit.
 *
 * The counterpart of the native `Math.clz32`, which counts the leading zero
 * bits.
 * @param value - The number to read.
 * Treated as a 32-bit integer, so negative numbers work too.
 * @returns The number of trailing zero bits, from `0` to `31`, or `32` when `value` is `0`.
 * @example
 * // 0b1000
 * countTrailingZeroBits(8);
 * // 3
 * @example
 * countTrailingZeroBits(1);
 * // 0
 * countTrailingZeroBits(0);
 * // 32
 */
export const countTrailingZeroBits: (value: number) => number = ctz32;
