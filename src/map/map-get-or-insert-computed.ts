/**
 * Returns the value stored under `key`, first inserting the result of `computeDefaultValue` when
 * the key is not present.
 *
 * The lazy counterpart of `mapGetOrInsert`: `computeDefaultValue` runs only on a miss, so it suits
 * defaults that are expensive to build, must not be shared between keys, or have side effects.
 * An already present value is never overwritten, and a stored `undefined` counts as present.
 *
 * Calls the native `Map#getOrInsertComputed` when the map has it, which doesn't call the `has`,
 * `get` and `set` methods of the map: a `Map` subclass that overrides them should override
 * `getOrInsertComputed` too.
 * @param map - The map to read from.
 * Mutated only when `key` is not present.
 * @param key - The key to look up.
 * @param computeDefaultValue - Produces the value to insert.
 * Called with `key`, and only when `key` is not present.
 * @returns The value already stored under `key`, or the computed value when it has just been
 * inserted.
 * @example
 * // Grouping entries by key: every miss gets its own array
 * const entriesByPackageId = new Map<string, Entry[]>();
 * mapGetOrInsertComputed(entriesByPackageId, packageId, () => []).push(newEntry);
 * @example
 * // The looked-up key is passed to the factory
 * const messagesByChannel = new Map<string, string[]>();
 * mapGetOrInsertComputed(messagesByChannel, 'general', (channel) => [`joined ${channel}`]);
 * // ['joined general']
 * @example
 * // Nothing is computed for a key that is already there
 * mapGetOrInsertComputed(new Map([['alice', 10]]), 'alice', () => expensiveDefault());
 * // 10, `expensiveDefault` never runs
 */
export const mapGetOrInsertComputed = <K, V>(
  map: Map<K, V>,
  key: K,
  computeDefaultValue: (key: K) => V,
) => {
  // Not every supported environment has it
  const nativeMap: Map<K, V> & {
    getOrInsertComputed?: (key: K, computeDefaultValue: (key: K) => V) => V;
  } = map;
  if (nativeMap.getOrInsertComputed) {
    return nativeMap.getOrInsertComputed(key, computeDefaultValue);
  }

  if (map.has(key)) {
    // `V` may itself include `undefined`, so `has` is the only sound presence check, and `get`
    // cannot be narrowed by it
    return map.get(key) as V;
  }

  const defaultValue = computeDefaultValue(key);

  map.set(key, defaultValue);

  return defaultValue;
};
