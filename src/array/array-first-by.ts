import {type FirstBy, type OrderRule, firstBy} from 'remeda';

/**
 * Returns the first element of `array` according to one or more ordering
 * `rules`, computed in O(n) **without** fully sorting the array.
 * With a single ascending rule this is the minimum; with `'desc'` it is the
 * maximum.
 * Extra rules act as tie-breakers, applied left to right.
 *
 * Each rule is either a projection `(item) => comparable` (ascending), or a
 * `[projection, 'asc' | 'desc']` pair to choose the direction.
 * The return type is the element type, plus `undefined` only when the input
 * could be empty (a non-empty tuple never yields `undefined`).
 * @param array - The array (or tuple) to search.
 * Not mutated.
 * @param rules - One or more ordering rules; later rules break ties of earlier ones.
 * @returns The first element by the given ordering, or `undefined` when the array is empty.
 * @example
 * // Minimum (single ascending rule)
 * arrayFirstBy([3, 1, 2], (value) => value);
 * // 1
 * @example
 * // Maximum (descending)
 * arrayFirstBy([3, 1, 2], [(value) => value, 'desc']);
 * // 3
 * @example
 * // Shortest word, breaking ties alphabetically
 * arrayFirstBy(['bb', 'a', 'cc', 'b'], (word) => word.length, (word) => word);
 * // 'a'
 * @example
 * // Empty array yields `undefined`
 * arrayFirstBy([], (value) => value);
 * // undefined
 */
export const arrayFirstBy = <T extends readonly unknown[]>(
  array: T,
  ...rules: [OrderRule<T[number]>, ...OrderRule<T[number]>[]]
): FirstBy<T> => firstBy(array, ...rules);
