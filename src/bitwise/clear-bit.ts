import {bitClear} from '@thi.ng/binary/edit';
import type {BitIndex} from './is-bit-index.ts';

/**
 * Returns `value` with the bit at the given index set to `0`. Bit `0` is the
 * least significant one.
 *
 * The result is an unsigned 32-bit integer (from `0` to `2 ** 32 - 1`).
 * Use `toInt32` to get a signed one.
 * @param value - The number to change. Treated as a 32-bit integer, so negative numbers work too.
 * @param bitIndex - The index of the bit, from `0` to `31`. Check a dynamic number with `isBitIndex` first.
 * @returns The new number.
 * @example
 * // 0b0111 → 0b0101
 * clearBit(7, 1);
 * // 5
 * @example
 * // The result is unsigned
 * clearBit(-1, 0);
 * // 4_294_967_294
 */
export const clearBit: (value: number, bitIndex: BitIndex) => number = bitClear;
