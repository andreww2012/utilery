import {rotateLeft} from '@thi.ng/binary/rotate';
import type {BitIndex} from './is-bit-index.ts';

/**
 * Shifts the bits of the 32-bit integer representation of `value` to the left by `count` places,
 * moving the bits that fall off the left end to the right end (a circular shift)
 */
export const rotateBitsLeft: {
  /**
   * Shifts the bits of the 32-bit integer representation of `value` to the left
   * by `count` places, moving the bits that fall off the left end to the right
   * end (a circular shift).
   * Common in hash functions.
   * @param value - The number to rotate.
   * Treated as a 32-bit integer, so negative numbers work too.
   * @param count - The number of places to rotate by, from `0` to `31`.
   * Check a dynamic number with `isBitIndex` first.
   * @returns The rotated number, as an unsigned 32-bit integer (from `0` to `2 ** 32 - 1`).
   * @example
   * // 0x80000001 → 0x00000003
   * rotateBitsLeft(0x80_00_00_01, 1);
   * // 3
   * @example
   * rotateBitsLeft(0x12_34_56_78, 8);
   * // 0x34_56_78_12
   */
  (value: number, count: BitIndex): number;
} = rotateLeft;
