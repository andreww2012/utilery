/**
 * Invokes the callback once for each element of an iterable, in iteration
 * order.
 * The iterable is fully consumed.
 * @param iterable - The iterable to walk.
 * Consumed exactly once.
 * @param callback - Invoked with each value.
 * Its return value is ignored.
 * @example
 * // Collect each value
 * const seen: number[] = [];
 * forEach([1, 2, 3], (value) => seen.push(value));
 * // seen === [1, 2, 3]
 * @example
 * // Works on any iterable: here, a Set
 * const seen: string[] = [];
 * forEach(new Set(['a', 'b']), (value) => seen.push(value));
 * // seen === ['a', 'b']
 * @example
 * // Empty iterables invoke the callback zero times
 * let calls = 0;
 * forEach([], () => calls++);
 * // calls === 0
 */
export const forEach = <T>(iterable: Iterable<T>, callback: (value: T) => void): void => {
  for (const item of iterable) {
    callback(item);
  }
};
