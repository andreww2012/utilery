import {mapValues} from 'es-toolkit/map';

/** Returns a new `Map` with the same keys and the values a function returns */
export const mapMapValues: {
  /**
   * Returns a new `Map` with the same keys and the values a function returns.
   * For plain objects, use `mapValues`.
   * @param map - The map to transform.
   * Not mutated.
   * @param getNewValue - Returns the new value of an entry.
   * Receives the value, the key and the map.
   * @returns A new map with the new values.
   * @example
   * const stock = new Map([['apples', 1], ['pears', 2]]);
   * mapMapValues(stock, (count) => count * 10);
   * // Map {'apples' => 10, 'pears' => 20}
   */
  <K, V, R>(map: Map<K, V>, getNewValue: (value: V, key: K, map: Map<K, V>) => R): Map<K, R>;
} = mapValues;
