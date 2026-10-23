/**
 * Calculates the sum of an iterable of bigints, in a single pass and without
 * materializing an intermediate array, so it works on any iterable (generators,
 * `Set`s, ...), not just arrays.
 * When the second argument is omitted, the elements are summed directly.
 * When a `getValue` function is provided, each element (along with its
 * zero-based position) is mapped through it first and the resulting bigints are
 * summed.
 *
 * The bigint counterpart of `sum`.
 * Returns `0n` for an empty input.
 * @param items - The iterable to sum.
 * Not mutated.
 * @param getValue - Optional selector that produces the bigint to add from each
 * element.
 * Receives the element and its zero-based position.
 * @returns The sum of the resolved bigints, or `0n` if `items` is empty.
 * @example
 * bigintSum([1n, 2n, 3n]);
 * // 6n
 * @example
 * // With a selector: sum a bigint field of objects
 * bigintSum([{size: 1n}, {size: 2n}], (item) => item.size);
 * // 3n
 * @example
 * bigintSum([]);
 * // 0n
 */
export function bigintSum<T>(
  items: Iterable<T>,
  getValue: (element: T, index: number) => bigint,
): bigint;
export function bigintSum(items: Iterable<bigint>): bigint;
export function bigintSum<T>(
  items: Iterable<T>,
  getValue?: (element: T, index: number) => bigint,
): bigint {
  let total = 0n;
  let index = 0;

  for (const element of items) {
    total += getValue ? getValue(element, index) : (element as bigint);
    index += 1;
  }

  return total;
}
