import {hasValue} from 'es-toolkit/map';

/** Checks whether a `Map` has an entry with the given value */
// eslint-disable-next-line unicorn/consistent-boolean-name
export const mapHasValue: {
  /**
   * Checks whether a `Map` has an entry with the given value.
   * Values are compared with `SameValueZero`, like `Array.prototype.includes`
   * does, so `NaN` matches `NaN`.
   * @param map - The map to search.
   * @param value - The value to look for.
   * @returns `true` if some entry has the value, otherwise `false`.
   * @example
   * const stock = new Map([['apples', 1], ['pears', 2]]);
   * mapHasValue(stock, 2);
   * // true
   * mapHasValue(stock, 5);
   * // false
   */
  <K, V>(map: Map<K, V>, value: V): boolean;
} = hasValue;
