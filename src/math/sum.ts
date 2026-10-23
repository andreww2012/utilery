/**
 * Calculates the sum of an iterable of numbers, in a single pass and without
 * materializing an intermediate array, so it works on any iterable (generators,
 * `Set`s, ...), not just arrays.
 * When the second argument is omitted, the elements are summed directly.
 * When a `getValue` function is provided, each element (along with its
 * zero-based position) is mapped through it first and the resulting numbers are
 * summed.
 *
 * Returns `0` for an empty input.
 * @param items - The iterable to sum.
 * Not mutated.
 * @param getValue - Optional selector that produces the numeric value to add
 * from each element.
 * Receives the element and its zero-based position.
 * @returns The sum of the resolved numeric values, or `0` if `items` is empty.
 * @example
 * // Basic sum of a number array
 * sum([1, 2, 3, 4, 5]);
 * // 15
 * @example
 * // Works on any iterable
 * sum(new Set([1, 2, 3]));
 * // 6
 * @example
 * // With a selector: sum a numeric field of objects
 * sum([{a: 1}, {a: 2}, {a: 3}], (item) => item.a);
 * // 6
 * @example
 * // The selector receives the position too
 * sum([{a: 1}, {a: 2}, {a: 3}], (item, index) => item.a * index);
 * // 8
 * @example
 * // Empty input returns 0
 * sum([]);
 * // 0
 */
export function sum<T>(items: Iterable<T>, getValue: (element: T, index: number) => number): number;
export function sum(items: Iterable<number>): number;
export function sum<T>(
  items: Iterable<T>,
  getValue?: (element: T, index: number) => number,
): number {
  let total = 0;
  let index = 0;

  for (const element of items) {
    total += getValue ? getValue(element, index) : (element as number);
    index += 1;
  }

  return total;
}
