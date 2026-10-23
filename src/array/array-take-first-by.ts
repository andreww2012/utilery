import {type OrderRule, takeFirstBy} from 'remeda';

/**
 * Returns the `count` "smallest" elements of `array` by the given ordering
 * `rules`, computed in O(n) **without** fully sorting (a partial selection).
 * Because no full sort happens, **the order of the returned elements is not
 * guaranteed**, only their set is.
 *
 * Each rule is either a projection `(item) => comparable` (ascending) or a
 * `[projection, 'asc' | 'desc']` pair; later rules break ties.
 * @param array - The array to select from.
 * Not mutated.
 * @param count - How many of the "smallest" elements (by the ordering) to take.
 * @param rules - One or more ordering rules; later rules break ties of earlier ones.
 * @returns A new array of the `count` smallest elements (in unspecified order).
 * @example
 * // The 2 smallest values
 * arrayTakeFirstBy([3, 1, 4, 1, 5], 2, (value) => value);
 * // [1, 1]
 * @example
 * // The 2 largest values (in any order)
 * arrayTakeFirstBy([3, 1, 4, 1, 5], 2, [(value) => value, 'desc']);
 * // [4, 5]
 */
export const arrayTakeFirstBy = <T>(
  array: readonly T[],
  count: number,
  ...rules: [OrderRule<T>, ...OrderRule<T>[]]
) => takeFirstBy(array, count, ...rules);
