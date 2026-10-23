import {map} from 'es-toolkit/set';

/** Returns a new `Set` of the values a function returns for each element */
export const setMapValues: {
  /**
   * Returns a new `Set` of the values a function returns for each element.
   * Elements that map to the same value become one.
   * @param set - The set to transform.
   * Not mutated.
   * @param getNewValue - Returns the new value of an element.
   * Receives the element twice (like `Set.prototype.forEach` does) and the set.
   * @returns A new set of the new values.
   * @example
   * setMapValues(new Set([1, 2, 3]), (value) => value * 2);
   * // Set {2, 4, 6}
   * @example
   * setMapValues(new Set(['a', 'A', 'b']), (value) => value.toLowerCase());
   * // Set {'a', 'b'}
   */
  <T, U>(set: Set<T>, getNewValue: (value: T, value2: T, set: Set<T>) => U): Set<U>;
} = map;
