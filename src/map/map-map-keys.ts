import {mapKeys} from 'es-toolkit/map';

/** Returns a new `Map` with the same values, under the keys a function returns */
export const mapMapKeys: {
  /**
   * Returns a new `Map` with the same values, under the keys a function returns.
   * When two entries get the same key, the later one wins.
   * For plain objects, use `mapKeys`.
   * @param map - The map to transform.
   * Not mutated.
   * @param getNewKey - Returns the new key of an entry.
   * Receives the value, the key and the map.
   * @returns A new map with the new keys.
   * @example
   * const stock = new Map([['apples', 1], ['pears', 2]]);
   * mapMapKeys(stock, (count, name) => name.toUpperCase());
   * // Map {'APPLES' => 1, 'PEARS' => 2}
   */
  <K, V>(map: Map<K, V>, getNewKey: (value: V, key: K, map: Map<K, V>) => K): Map<K, V>;
} = mapKeys;
