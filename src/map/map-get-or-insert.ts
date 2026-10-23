/**
 * Returns the value stored under `key`, first inserting `defaultValue` when the key is not present.
 *
 * The return type is not optional, unlike `Map#get`, so the result is directly usable, which
 * collapses the usual "look up, create when missing, then use" dance into a single expression.
 * An already present value is never overwritten, and a stored `undefined` counts as present.
 *
 * `defaultValue` is evaluated by the caller on every call, even when `key` is already present.
 * Use `mapGetOrInsertComputed` when producing it is expensive or has side effects.
 *
 * Calls the native `Map#getOrInsert` when the map has it, which doesn't call the `has`, `get` and
 * `set` methods of the map: a `Map` subclass that overrides them should override `getOrInsert` too.
 * @param map - The map to read from.
 * Mutated only when `key` is not present.
 * @param key - The key to look up.
 * @param defaultValue - The value to insert and return when `key` is not present.
 * @returns The value already stored under `key`, or `defaultValue` when it has just been inserted.
 * @example
 * // Appending to an array-valued map without a separate existence check
 * const tagsByPostId = new Map<string, string[]>();
 * mapGetOrInsert(tagsByPostId, 'post-1', []).push('typescript');
 * // Map { 'post-1' => ['typescript'] }
 * @example
 * // An existing value is returned as-is
 * mapGetOrInsert(new Map([['alice', 10]]), 'alice', 0);
 * // 10
 * @example
 * // A stored `undefined` is a value, not a miss
 * mapGetOrInsert(new Map<string, number | undefined>([['a', undefined]]), 'a', 42);
 * // undefined
 */
export const mapGetOrInsert = <K, V>(map: Map<K, V>, key: K, defaultValue: V) => {
  // Not every supported environment has it
  const nativeMap: Map<K, V> & {getOrInsert?: (key: K, defaultValue: V) => V} = map;
  if (nativeMap.getOrInsert) {
    return nativeMap.getOrInsert(key, defaultValue);
  }

  if (map.has(key)) {
    // `V` may itself include `undefined`, so `has` is the only sound presence check, and `get`
    // cannot be narrowed by it
    return map.get(key) as V;
  }

  map.set(key, defaultValue);

  return defaultValue;
};
