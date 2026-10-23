/**
 * Finds the largest number or bigint in an iterable, in a single pass and without
 * materializing an intermediate array, so it works on lazy sequences
 * (generators, `Set`s, ...) and stays correct where `Math.max(...array)` breaks:
 * it never overflows the argument/stack limit on large inputs, and returns
 * `undefined` (rather than `-Infinity`) for an empty input.
 *
 * To find the element with the largest *derived* value instead, use
 * `array/maxBy`, which returns the element rather than the number.
 * @param items - The iterable of numbers and/or bigints to scan.
 * Not mutated.
 * @returns The largest value, or `undefined` if `items` is empty.
 * @example
 * // Largest of an array
 * max([3, 1, 4, 1, 5]);
 * // 5
 * @example
 * // Works on any iterable
 * max(new Set([10, 20, 30]));
 * // 30
 * @example
 * // Bigints (can be mixed with numbers)
 * max([3n, 1n, 4n]);
 * // 4n
 * @example
 * // Empty input returns `undefined`
 * max([]);
 * // undefined
 */
export const max = <T extends number | bigint>(items: Iterable<T>): T | undefined => {
  let result: T | undefined;

  for (const value of items) {
    if (result == null || value > result) {
      result = value;
    }
  }

  return result;
};
