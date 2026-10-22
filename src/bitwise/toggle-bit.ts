import {bitFlip} from '@thi.ng/binary/edit';
import type {BitIndex} from './is-bit-index.ts';

/**
 * Returns `value` with the bit at the given index flipped: `0` becomes `1` and
 * `1` becomes `0`. Bit `0` is the least significant one.
 *
 * The result is an unsigned 32-bit integer (from `0` to `2 ** 32 - 1`).
 * Use `toInt32` to get a signed one.
 * @param value - The number to change. Treated as a 32-bit integer, so negative numbers work too.
 * @param bitIndex - The index of the bit, from `0` to `31`. Check a dynamic number with `isBitIndex` first.
 * @returns The new number.
 * @example
 * // 0b0101 → 0b0111
 * toggleBit(5, 1);
 * // 7
 * @example
 * // 0b0101 → 0b0001
 * toggleBit(5, 2);
 * // 1
 */
export const toggleBit: (value: number, bitIndex: BitIndex) => number = bitFlip;
