import {type OrderRule, dropFirstBy} from 'remeda';

/**
 * Returns `array` without its `count` "smallest" elements by the given ordering
 * `rules` (keeping the other elements), computed in O(n) **without** fully
 * sorting.
 * Because no full sort happens, **the order of the returned elements is not
 * guaranteed**, only their set is.
 *
 * Each rule is either a projection `(item) => comparable` (ascending) or a
 * `[projection, 'asc' | 'desc']` pair; later rules break ties.
 * @param array - The array to drop from.
 * Not mutated.
 * @param count - How many of the "smallest" elements (by the ordering) to drop.
 * @param rules - One or more ordering rules; later rules break ties of earlier ones.
 * @returns A new array without the `count` smallest elements (in unspecified order).
 * @example
 * // Drop the 2 smallest values, keep the rest (in any order)
 * arrayDropFirstBy([3, 1, 4, 1, 5], 2, (value) => value);
 * // [4, 3, 5]
 * @example
 * // Drop the 2 largest values (in any order)
 * arrayDropFirstBy([3, 1, 4, 1, 5], 2, [(value) => value, 'desc']);
 * // [1, 1, 3]
 */
export const arrayDropFirstBy = <T>(
  array: readonly T[],
  count: number,
  ...rules: [OrderRule<T>, ...OrderRule<T>[]]
) => dropFirstBy(array, count, ...rules);
