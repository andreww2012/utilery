import {type OrderRule, rankBy} from 'remeda';

/**
 * Returns the rank `item` would have if inserted into `array` ordered by the
 * given `rules`, that is, the number of elements that sort *before* it (its
 * index in the sorted order), computed in O(n) **without** fully sorting.
 * `item` itself does not need to be present in `array`.
 *
 * Each rule is either a projection `(item) => comparable` (ascending) or a
 * `[projection, 'asc' | 'desc']` pair; later rules break ties.
 * @param array - The array to rank against.
 * Not mutated.
 * @param item - The item whose rank is computed (need not be in `array`).
 * @param rules - One or more ordering rules; later rules break ties of earlier ones.
 * @returns The 0-based rank of `item` in the ordering.
 * @example
 * // How many values are smaller than 3
 * arrayRankBy([5, 1, 3, 2], 3, (value) => value);
 * // 2
 * @example
 * // Rank of a value not present in the array
 * arrayRankBy([5, 1, 3, 2], 4, (value) => value);
 * // 3
 */
export const arrayRankBy = <T>(
  array: readonly T[],
  item: T,
  ...rules: [OrderRule<T>, ...OrderRule<T>[]]
): number => rankBy(array, item, ...rules);
