import {reduce} from 'es-toolkit/map';

/**
 * Reduces the entries of a `Map` to a single value, in insertion order, like
 * `Array.prototype.reduce`
 */
export const mapReduce: {
  /**
   * Reduces the entries of a `Map` to a single value, in insertion order, like
   * `Array.prototype.reduce`.
   * Without `initialValue`, the first value of the map is the initial
   * accumulator and the reduction starts from the second entry.
   * An accumulator of `null` or `undefined` counts as missing too: an
   * `initialValue` of `null` is skipped, and when the callback returns `null` or
   * `undefined`, the next value replaces it.
   * @param map - The map to reduce.
   * @param callback - Returns the next accumulator.
   * Receives the accumulator, the value, the key and the map.
   * @param initialValue - The initial accumulator.
   * @returns The last accumulator.
   * @throws {TypeError} When the map is empty and `initialValue` is not given, or is `null` or
   * `undefined`.
   * @example
   * const stock = new Map([['apples', 1], ['pears', 2]]);
   * mapReduce(stock, (total, count) => total + count, 0);
   * // 3
   * @example
   * // Without an initial value
   * mapReduce(new Map([['a', 10], ['b', 20]]), (total, count) => total + count);
   * // 30
   */
  <K, V, A = V>(
    map: Map<K, V>,
    callback: (accumulator: A, value: V, key: K, map: Map<K, V>) => A,
    initialValue?: A,
  ): A;
} = reduce;
