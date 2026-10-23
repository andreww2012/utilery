import {rotateRight} from '@thi.ng/binary/rotate';
import type {BitIndex} from './is-bit-index.ts';

/**
 * Shifts the bits of the 32-bit integer representation of `value` to the right by `count` places,
 * moving the bits that fall off the right end to the left end (a circular shift).
 */
export const rotateBitsRight: {
  /**
   * Shifts the bits of the 32-bit integer representation of `value` to the right
   * by `count` places, moving the bits that fall off the right end to the left
   * end (a circular shift).
   * Common in hash functions.
   * @param value - The number to rotate.
   * Treated as a 32-bit integer, so negative numbers work too.
   * @param count - The number of places to rotate by, from `0` to `31`.
   * Check a dynamic number with `isBitIndex` first.
   * @returns The rotated number, as an unsigned 32-bit integer (from `0` to `2 ** 32 - 1`).
   * @example
   * // 0x00000003 → 0x80000001
   * rotateBitsRight(3, 1);
   * // 2_147_483_649
   * @example
   * rotateBitsRight(0x12_34_56_78, 8);
   * // 0x78_12_34_56
   */
  (value: number, count: BitIndex): number;
} = rotateRight;
