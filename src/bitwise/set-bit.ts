import {bitClear, bitSet} from '@thi.ng/binary/edit';
import type {BitIndex} from './is-bit-index.ts';

/**
 * Returns `value` with the bit at the given index set to `1`, or to `0` when
 * `isSet` is `false`.
 * Bit `0` is the least significant one.
 *
 * The result is an unsigned 32-bit integer (from `0` to `2 ** 32 - 1`), so
 * setting bit `31` gives a positive number.
 * Use `toInt32` to get a signed one.
 * @param value - The number to change.
 * Treated as a 32-bit integer, so negative numbers work too.
 * @param bitIndex - The index of the bit, from `0` to `31`.
 * Check a dynamic number with `isBitIndex` first.
 * @param isSet - The new state of the bit.
 * Defaults to `true`.
 * @returns The new number.
 * @example
 * // 0b0001 → 0b0101
 * setBit(1, 2);
 * // 5
 * @example
 * // Sync a flag with a condition
 * setBit(0b0111, 1, false);
 * // 5 (0b0101)
 * @example
 * // The result is unsigned
 * setBit(0, 31);
 * // 2_147_483_648
 */
export const setBit = (value: number, bitIndex: BitIndex, isSet = true) =>
  isSet ? bitSet(value, bitIndex) : bitClear(value, bitIndex);
