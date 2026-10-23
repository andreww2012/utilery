import {type OrderRule, nthBy} from 'remeda';

/**
 * Returns the element that would be at position `index` if `array` were sorted
 * by the given ordering `rules`, computed in O(n) **without** fully sorting.
 * Negative indexes are not supported (use a positive index).
 * Out-of-bounds indexes yield `undefined`.
 *
 * Each rule is either a projection `(item) => comparable` (ascending) or a
 * `[projection, 'asc' | 'desc']` pair; later rules break ties.
 * @param array - The array to search.
 * Not mutated.
 * @param index - The 0-based position in the (virtually) sorted order.
 * @param rules - One or more ordering rules; later rules break ties of earlier ones.
 * @returns The element at that sorted position, or `undefined` when out of bounds.
 * @example
 * // The 2nd-smallest value (index 1)
 * arrayNthBy([3, 1, 2], 1, (value) => value);
 * // 2
 * @example
 * // The largest value (index 0, descending)
 * arrayNthBy([3, 1, 2], 0, [(value) => value, 'desc']);
 * // 3
 * @example
 * // Out of bounds
 * arrayNthBy([3, 1, 2], 9, (value) => value);
 * // undefined
 */
export const arrayNthBy = <T extends readonly unknown[]>(
  array: T,
  index: number,
  ...rules: [OrderRule<T[number]>, ...OrderRule<T[number]>[]]
): T[number] | undefined => nthBy(array, index, ...rules);
