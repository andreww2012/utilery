import type {BitIndex} from './is-bit-index.ts';

/**
 * Checks whether the bit at the given index is `1` in the 32-bit integer
 * representation of `value`.
 * Bit `0` is the least significant one.
 *
 * Handy for reading bit flags, where each bit of a number stores one boolean.
 * @param value - The number to read the bit from.
 * Treated as a 32-bit integer, so negative numbers work too.
 * @param bitIndex - The index of the bit, from `0` to `31`.
 * Check a dynamic number with `isBitIndex` first.
 * @returns `true` if the bit is `1`, otherwise `false`.
 * @example
 * // 0b0101
 * isBitSet(5, 0);
 * // true
 * isBitSet(5, 1);
 * // false
 * @example
 * // Bit flags
 * const CAN_EDIT = 2;
 * isBitSet(permissions, CAN_EDIT);
 */
export const isBitSet = (value: number, bitIndex: BitIndex) => ((value >>> bitIndex) & 1) === 1;
