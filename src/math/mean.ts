/**
 * Calculates the arithmetic mean of an iterable of numbers, in a single pass
 * and without materializing an intermediate array, so it works on any iterable
 * (generators, `Set`s, ...), not just arrays.
 * When the second argument is omitted, the elements are averaged directly.
 * When a `getValue` function is provided, each element is mapped through it
 * first and the resulting numbers are averaged.
 *
 * Returns `NaN` for an empty input.
 * @param items - The iterable to average.
 * Not mutated.
 * @param getValue - Optional selector that produces the numeric value to
 * average from each element.
 * @returns The arithmetic mean, or `NaN` if `items` is empty.
 * @example
 * // Basic average of a number array
 * mean([1, 2, 3, 4, 5]);
 * // 3
 * @example
 * // Works on any iterable
 * mean(new Set([1, 2, 3]));
 * // 2
 * @example
 * // With a selector: average a numeric field of objects
 * mean([{a: 1}, {a: 2}, {a: 3}], (item) => item.a);
 * // 2
 * @example
 * // Empty input returns NaN
 * mean([]);
 * // NaN
 */
export function mean<T>(items: Iterable<T>, getValue: (element: T) => number): number;
export function mean(items: Iterable<number>): number;
export function mean<T>(items: Iterable<T>, getValue?: (element: T) => number): number {
  let total = 0;
  let count = 0;

  for (const element of items) {
    total += getValue ? getValue(element) : (element as number);
    count += 1;
  }

  return count === 0 ? Number.NaN : total / count;
}
