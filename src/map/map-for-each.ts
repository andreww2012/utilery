import {forEach} from 'es-toolkit/map';

/** Calls a function for each entry of a `Map`, in insertion order, like `Map.prototype.forEach` */
export const mapForEach: {
  /**
   * Calls a function for each entry of a `Map`, in insertion order, like
   * `Map.prototype.forEach`.
   * @param map - The map to iterate over.
   * @param callback - Receives the value, the key and the map.
   * @example
   * const stock = new Map([['apples', 1], ['pears', 2]]);
   * mapForEach(stock, (count, name) => console.log(`${name}: ${count}`));
   * // logs 'apples: 1', then 'pears: 2'
   */
  <K, V>(map: Map<K, V>, callback: (value: V, key: K, map: Map<K, V>) => void): void;
} = forEach;
