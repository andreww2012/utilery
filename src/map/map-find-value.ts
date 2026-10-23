import {findValue} from 'es-toolkit/map';

/** Returns the value of the first entry of a `Map` that matches a predicate */
export const mapFindValue: {
  /**
   * Returns the value of the first entry of a `Map` that matches a predicate.
   * For the key instead, use `mapFindKey`.
   * @param map - The map to search.
   * @param predicate - Returns `true` for a matching entry.
   * Receives the value, the key and the map.
   * @returns The value of the first matching entry, or `undefined` if none matches.
   * @example
   * const users = new Map([[1, {name: 'Ada', isAdmin: false}], [2, {name: 'Bob', isAdmin: true}]]);
   * mapFindValue(users, (user) => user.isAdmin);
   * // {name: 'Bob', isAdmin: true}
   */
  <K, V>(map: Map<K, V>, predicate: (value: V, key: K, map: Map<K, V>) => boolean): V | undefined;
} = findValue;
