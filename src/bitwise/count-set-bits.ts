import {popCount} from '@thi.ng/binary/count';

/**
 * Counts the bits that are `1` in the 32-bit integer representation of
 * `value`, also known as the population count or Hamming weight.
 *
 * To count the bits that differ between two numbers (their Hamming distance),
 * pass `a ^ b`.
 * @param value - The number to read.
 * Treated as a 32-bit integer, so negative numbers work too.
 * @returns The number of set bits, from `0` to `32`.
 * @example
 * // 0b1011
 * countSetBits(11);
 * // 3
 * @example
 * // All 32 bits are set in -1
 * countSetBits(-1);
 * // 32
 * @example
 * // Hamming distance
 * countSetBits(0b1100 ^ 0b1010);
 * // 2
 */
export const countSetBits: (value: number) => number = popCount;
