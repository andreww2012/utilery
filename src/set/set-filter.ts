import {filter} from 'es-toolkit/set';

/** Returns a new `Set` with only the elements that match a predicate, in the original order */
export const setFilter: {
  /**
   * Returns a new `Set` with only the elements that match a predicate, in the
   * original order.
   * @param set - The set to filter.
   * Not mutated.
   * @param predicate - Returns `true` for the elements to keep.
   * Receives the element twice (like `Set.prototype.forEach` does) and the set.
   * @returns A new set of the matching elements.
   * @example
   * setFilter(new Set([1, 2, 3, 4, 5]), (value) => value > 2);
   * // Set {3, 4, 5}
   */
  <T>(set: Set<T>, predicate: (value: T, value2: T, set: Set<T>) => boolean): Set<T>;
} = filter;
