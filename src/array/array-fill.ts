import {fill, toFilled} from 'es-toolkit/array';

/**
 * Replaces a contiguous slice of an array with a given value.
 * By default this mutates the input array; pass `{copy: true}` as the fifth argument to
 * instead get a new array back, leaving the input untouched.
 * @param array - The array to fill.
 * @param value - The value to place into every slot in the `[start, end)` range.
 * @param start - The start index (inclusive).
 * Defaults to `0`.
 * Negative indexes are counted from the end of the array.
 * @param end - The end index (exclusive).
 * Defaults to the array's length.
 * Negative indexes are counted from the end of the array.
 * @param options - Optional behavior flags.
 * @param options.copy Set to `true` to avoid mutating the input and receive a fresh array instead.
 * Defaults to `false`.
 * @returns Either the (now-mutated) input array, or a new array when `copy` is `true`.
 * @example
 * // Fill the entire array (mutating, the default)
 * arrayFill([1, 2, 3], 'a');
 * // ['a', 'a', 'a']
 * @example
 * // Fill a slice
 * arrayFill([4, 6, 8, 10], '*', 1, 3);
 * // [4, '*', '*', 10]
 * @example
 * // Negative indexes count from the end
 * arrayFill([1, 2, 3], '*', -2, -1);
 * // [1, '*', 3]
 * @example
 * // Without `copy`, the input is mutated
 * const input = [1, 2, 3];
 * const result = arrayFill(input, 0);
 * // result === input; both are now [0, 0, 0]
 * @example
 * // With `{copy: true}`, the input is preserved and a new array is returned
 * const input = [1, 2, 3];
 * const result = arrayFill(input, 0, 0, 3, {copy: true});
 * // result is [0, 0, 0]; input is still [1, 2, 3]
 */
export const arrayFill = <T, U>(
  array: (T | U)[],
  value: U,
  start?: number,
  end?: number,
  options?: {
    /**
     * When `true`, the input array is left untouched and a new array is returned.
     * When `false` (the default), the input array is mutated in place and returned
     */
    copy?: boolean;
  },
): (T | U)[] => {
  const finalStart = start || 0;
  const finalEnd = end ?? array.length;

  return options?.copy
    ? toFilled(array, value, finalStart, finalEnd)
    : fill(array, value, finalStart, finalEnd);
};
