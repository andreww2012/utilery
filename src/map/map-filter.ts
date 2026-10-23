import {filter} from 'es-toolkit/map';

/** Returns a new `Map` with only the entries that match a predicate, in the original order */
export const mapFilter: {
  /**
   * Returns a new `Map` with only the entries that match a predicate, in the
   * original order.
   * @param map - The map to filter.
   * Not mutated.
   * @param predicate - Returns `true` for the entries to keep.
   * Receives the value, the key and the map.
   * @returns A new map of the matching entries.
   * @example
   * const stock = new Map([['apples', 1], ['pears', 2], ['plums', 3]]);
   * mapFilter(stock, (count) => count > 1);
   * // Map {'pears' => 2, 'plums' => 3}
   */
  <K, V>(map: Map<K, V>, predicate: (value: V, key: K, map: Map<K, V>) => boolean): Map<K, V>;
} = filter;
