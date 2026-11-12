import {mapHas as mapHasBase} from 'ts-extras';

/**
 * Checks whether a map has a key, like `Map.prototype.has`, but as a type guard: when it returns
 * `true`, the key is narrowed to the key type of the map
 */
// eslint-disable-next-line unicorn/consistent-boolean-name -- named after `Map.prototype.has`
export const mapHas: {
  /**
   * Checks whether a map has a key, like `Map.prototype.has`.
   * The key already has the key type of the map, so nothing is narrowed: a key
   * that is not in the map may still have that type.
   * Keys are compared with `SameValueZero`, so `NaN` matches `NaN`.
   * To look for a value, use `mapHasValue`.
   * @param map - The map to search.
   * @param key - The key to look for.
   * @returns `true` if the map has the key, otherwise `false`.
   * @example
   * const counts = new Map<string, number>();
   * declare const word: string;
   * if (!mapHas(counts, word)) {
   *   counts.set(word, 0); // `word` is still a `string`
   * }
   */
  <Key>(map: ReadonlyMap<Key, unknown>, key: NoInfer<Key>): boolean;

  /**
   * Checks whether a map has a key, like `Map.prototype.has`, but as a type
   * guard: when it returns `true`, the key is narrowed to the key type of the
   * map, including `null` and `undefined`.
   * When it returns `false`, a key of a wider type (like `unknown` or `string`)
   * keeps its type.
   * A union key loses the members that the key type covers, even though the map
   * may not hold every key of that type: with a `Map<string, number>`, a
   * `string | undefined` key becomes `undefined`.
   * Keys are compared with `SameValueZero`, so `NaN` matches `NaN`.
   * To look for a value, use `mapHasValue`.
   * @param map - The map to search.
   * @param key - The key to look for.
   * @returns `true` if the map has the key, otherwise `false`.
   * @example
   * const LABELS = new Map([['s', 'Small'], ['m', 'Medium']] as const);
   * declare const input: string;
   * if (mapHas(LABELS, input)) {
   *   input; // 's' | 'm'
   * }
   */
  <Key extends SuperType, SuperType = unknown>(
    map: ReadonlyMap<Key, unknown>,
    key: SuperType,
  ): key is Key;
} = mapHasBase;
