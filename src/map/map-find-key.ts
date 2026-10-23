import {findKey} from 'es-toolkit/map';

/** Returns the key of the first entry of a `Map` that matches a predicate */
export const mapFindKey: {
  /**
   * Returns the key of the first entry of a `Map` that matches a predicate.
   * For the value instead, use `mapFindValue`.
   * @param map - The map to search.
   * @param predicate - Returns `true` for a matching entry.
   * Receives the value, the key and the map.
   * @returns The key of the first matching entry, or `undefined` if none matches.
   * @example
   * const stock = new Map([['apples', 10], ['pears', 5], ['plums', 15]]);
   * mapFindKey(stock, (count) => count < 10);
   * // 'pears'
   */
  <K, V>(map: Map<K, V>, predicate: (value: V, key: K, map: Map<K, V>) => boolean): K | undefined;
} = findKey;
