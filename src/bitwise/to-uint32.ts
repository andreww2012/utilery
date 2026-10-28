import {i32u32} from '@thi.ng/binary/int';

/**
 * Converts a number to an unsigned 32-bit integer (from `0` to `2 ** 32 - 1`), the same way the
 * `>>>` operator does: the fractional part is dropped and the bits above the 32nd are discarded
 */
export const toUint32: {
  /**
   * Converts a number to an unsigned 32-bit integer (from `0` to `2 ** 32 - 1`),
   * the same way the `>>>` operator does: the fractional part is dropped and the
   * bits above the 32nd are discarded.
   *
   * Reads a signed 32-bit value (like the result of `|` or `&`) as unsigned.
   * The reverse of `toInt32`.
   * @param value - The number to convert.
   * @returns The unsigned 32-bit integer.
   * @example
   * toUint32(-1);
   * // 4_294_967_295
   * toUint32(1 << 31);
   * // 2_147_483_648
   * @example
   * toUint32(5.9);
   * // 5
   */
  (value: number): number;
} = i32u32;
