import type {IntRange} from '../types/int-range.ts';

/**
 * The index of a bit in a 32-bit integer: an integer from `0` (the least
 * significant bit) to `31`
 */
export type BitIndex = IntRange<0, 32>;

/**
 * Checks whether a value is a valid index of a bit in a 32-bit integer: an
 * integer from `0` to `31`.
 *
 * The bit utilities only accept such indexes, so literals and enum members are
 * checked at compile time.
 * Use this type guard to pass a dynamic number, like a loop counter or a parsed
 * value, instead of casting it.
 * Bitwise operators take bit indexes modulo 32, so an unchecked out-of-range
 * index would silently address a wrong bit.
 * @param value - The value to check.
 * @returns `true` if `value` is an integer from `0` to `31`, otherwise `false`.
 * @example
 * isBitIndex(5);
 * // true
 * isBitIndex(32);
 * // false
 * isBitIndex(1.5);
 * // false
 * @example
 * // Skip invalid indexes
 * if (isBitIndex(index)) {
 *   flags = setBit(flags, index);
 * }
 * @example
 * // Throw on invalid indexes
 * invariant(isBitIndex(index), `Invalid bit index: ${index}`);
 * flags = setBit(flags, index);
 */
export const isBitIndex = (value: unknown): value is BitIndex =>
  typeof value === 'number' && Number.isSafeInteger(value) && value >= 0 && value <= 31;
