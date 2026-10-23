import {ctz32} from '@thi.ng/binary/count';
import type {BitIndex} from './is-bit-index.ts';
import {toInt32} from './to-int32.ts';

/**
 * Lists the indexes of the bits that are `1` in the 32-bit integer
 * representation of `value`, from the least significant one (index `0`) up.
 *
 * Handy for turning bit flags into a list of the enabled ones.
 * The indexes can be passed to the other bit utilities as is.
 * @param value - The number to read.
 * Treated as a 32-bit integer, so negative numbers work too.
 * @returns The indexes of the set bits, in ascending order.
 * @example
 * // 0b1010
 * indexesOfSetBits(10);
 * // [1, 3]
 * @example
 * indexesOfSetBits(0);
 * // []
 * @example
 * // Negative numbers have the sign bit set
 * indexesOfSetBits(-2_147_483_648);
 * // [31]
 */
export const indexesOfSetBits = (value: number): BitIndex[] => {
  const indexes: BitIndex[] = [];

  // Each step clears the lowest set bit, so the loop only visits the set ones
  for (let remaining = toInt32(value); remaining; remaining &= remaining - 1) {
    // The lowest set bit of a non-zero 32-bit integer is always at 0-31
    indexes.push(ctz32(remaining) as BitIndex);
  }

  return indexes;
};
