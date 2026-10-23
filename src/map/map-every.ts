import {every} from 'es-toolkit/map';

/** Checks whether every entry of a `Map` matches a predicate */
// eslint-disable-next-line unicorn/consistent-boolean-name
export const mapEvery: {
  /**
   * Checks whether every entry of a `Map` matches a predicate.
   * Stops at the first entry that does not match.
   * An empty map gives `true`.
   * @param map - The map to check.
   * @param predicate - Returns `true` for a matching entry.
   * Receives the value, the key and the map.
   * @returns `true` if every entry matches, otherwise `false`.
   * @example
   * const stock = new Map([['apples', 10], ['pears', 20]]);
   * mapEvery(stock, (count) => count > 5);
   * // true
   * mapEvery(stock, (count) => count > 15);
   * // false
   */
  <K, V>(map: Map<K, V>, predicate: (value: V, key: K, map: Map<K, V>) => boolean): boolean;
} = every;
