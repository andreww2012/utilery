import {u32i32} from '@thi.ng/binary/int';

/**
 * Converts a number to a signed 32-bit integer (from `-(2 ** 31)` to
 * `2 ** 31 - 1`), the same way bitwise operators do: the fractional part is
 * dropped and the bits above the 32nd are discarded.
 *
 * Reads an unsigned 32-bit value (like the result of `setBit`) as signed.
 * The reverse of `toUint32`.
 * @param value - The number to convert.
 * @returns The signed 32-bit integer.
 * @example
 * toInt32(2 ** 32 - 1);
 * // -1
 * toInt32(2 ** 31);
 * // -2_147_483_648
 * @example
 * toInt32(5.9);
 * // 5
 */
export const toInt32: (value: number) => number = u32i32;
