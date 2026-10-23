import {objectMap} from '@antfu/utils';

/**
 * Creates a new object from the own enumerable string-keyed entries of an object, each turned into
 * a new `[key, value]` pair by a function.
 */
export const mapEntries: {
  /**
   * Creates a new object from the own enumerable string-keyed entries of an
   * object, each turned into a new `[key, value]` pair by a function.
   * Returning `undefined` from the function leaves the entry out.
   * When two entries get the same key, the later one wins.
   * To only change the keys or the values, use `mapKeys` or `mapValues`.
   * @param object - The object to transform.
   * Not mutated.
   * @param fn - Returns the new `[key, value]` pair of an entry, or `undefined` to leave it out.
   * Receives the key and the value.
   * @returns A new object of the new entries.
   * @example
   * mapEntries({a: 1, b: 2}, (key, value) => [key.toUpperCase(), String(value)]);
   * // {A: '1', B: '2'}
   * @example
   * // Swap the keys and the values
   * mapEntries({a: 1, b: 2}, (key, value) => [value, key]);
   * // {1: 'a', 2: 'b'}
   * @example
   * // Leave entries out
   * mapEntries({a: 1, b: 2}, (key, value) => (key === 'a' ? undefined : [key, value]));
   * // {b: 2}
   */
  <K extends string, V, NK extends string | number | symbol = K, NV = V>(
    object: Record<K, V>,
    fn: (key: K, value: V) => [NK, NV] | undefined,
  ): Record<NK, NV>;
} = objectMap;
