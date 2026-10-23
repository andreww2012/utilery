/**
 * Calculates the median of an iterable of numbers, so it works on any iterable
 * (generators, `Set`s, ...), not just arrays.
 * When the second argument is omitted, the elements are used directly.
 * When a `getValue` function is provided, each element is mapped through it
 * first and the resulting numbers are used.
 *
 * Unlike the single-pass aggregations, the median requires the full sorted
 * sequence, so the input is materialized into an array internally.
 * For an odd-length input the median is the middle value of the sorted
 * sequence; for an even-length input it is the average of the two middle
 * values.
 * Returns `NaN` for an empty input.
 * @param items - The iterable to compute the median of.
 * Not mutated.
 * @param getValue - Optional selector that produces the numeric value to
 * use from each element.
 * @returns The median, or `NaN` if `items` is empty.
 * @example
 * // Odd-length number array
 * median([1, 2, 3, 4, 5]);
 * // 3
 * @example
 * // Even-length number array: average of the two middle values
 * median([1, 2, 3, 4]);
 * // 2.5
 * @example
 * // Works on any iterable
 * median(new Set([5, 1, 3]));
 * // 3
 * @example
 * // With a selector: median of a numeric field of objects
 * median([{a: 1}, {a: 2}, {a: 3}, {a: 4}, {a: 5}], (item) => item.a);
 * // 3
 * @example
 * // Empty input returns NaN
 * median([]);
 * // NaN
 */
export function median<T>(items: Iterable<T>, getValue: (element: T) => number): number;
export function median(items: Iterable<number>): number;
export function median<T>(items: Iterable<T>, getValue?: (element: T) => number): number {
  const values = getValue ? Array.from(items, getValue) : ([...items] as number[]);

  if (values.length === 0) {
    return Number.NaN;
  }

  values.sort((first, second) => first - second);

  const middle = values.length >>> 1;

  // eslint-disable-next-line ts/no-non-null-assertion -- Both indexes are in bounds: `values` is non-empty
  return values.length % 2 === 1 ? values[middle]! : (values[middle - 1]! + values[middle]!) / 2;
}
