import {some} from 'es-toolkit/map';

/** Checks whether at least one entry of a `Map` matches a predicate */
// eslint-disable-next-line unicorn/consistent-boolean-name
export const mapSome: {
  /**
   * Checks whether at least one entry of a `Map` matches a predicate.
   * Stops at the first entry that matches.
   * An empty map gives `false`.
   * @param map - The map to check.
   * @param predicate - Returns `true` for a matching entry.
   * Receives the value, the key and the map.
   * @returns `true` if some entry matches, otherwise `false`.
   * @example
   * const stock = new Map([['apples', 10], ['pears', 20]]);
   * mapSome(stock, (count) => count > 15);
   * // true
   * mapSome(stock, (count) => count > 25);
   * // false
   */
  <K, V>(map: Map<K, V>, predicate: (value: V, key: K, map: Map<K, V>) => boolean): boolean;
} = some;
