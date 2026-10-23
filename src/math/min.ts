/**
 * Finds the smallest number or bigint in an iterable, in a single pass and without
 * materializing an intermediate array, so it works on lazy sequences
 * (generators, `Set`s, ...) and stays correct where `Math.min(...array)` breaks:
 * it never overflows the argument/stack limit on large inputs, and returns
 * `undefined` (rather than `Infinity`) for an empty input.
 *
 * To find the element with the smallest *derived* value instead, use
 * `array/minBy`, which returns the element rather than the number.
 * @param items - The iterable of numbers and/or bigints to scan.
 * Not mutated.
 * @returns The smallest value, or `undefined` if `items` is empty.
 * @example
 * // Smallest of an array
 * min([3, 1, 4, 1, 5]);
 * // 1
 * @example
 * // Works on any iterable
 * min(new Set([10, 20, 30]));
 * // 10
 * @example
 * // Bigints (can be mixed with numbers)
 * min([3n, 1n, 4n]);
 * // 1n
 * @example
 * // Empty input returns `undefined`
 * min([]);
 * // undefined
 */
export const min = <T extends number | bigint>(items: Iterable<T>): T | undefined => {
  let result: T | undefined;

  for (const value of items) {
    if (result == null || value < result) {
      result = value;
    }
  }

  return result;
};
