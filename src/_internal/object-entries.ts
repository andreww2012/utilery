/**
 * `true` when the `exactOptionalPropertyTypes` compiler option is on: then an
 * optional property can't be set to `undefined` unless its type includes it
 */
type IsExactOptionalPropertyTypes = {a?: undefined} extends {a?: never} ? false : true;

/** The keys that built-in collections get from their prototypes */
type CollectionPrototypeKey<T> = T extends readonly unknown[]
  ? keyof unknown[]
  : T extends ReadonlyMap<unknown, unknown>
    ? keyof Map<unknown, unknown>
    : T extends ReadonlySet<unknown>
      ? keyof Set<unknown>
      : never;

/**
 * The key that `Object.entries` gives for the key `Key` of `T`, or `never` when
 * it skips the key
 */
type EntryKey<T, Key> = Key extends symbol
  ? never
  : Key extends number
    ? T extends readonly unknown[]
      ? // Tuple elements have own keys like `'0'`, so the index signature only
        // adds keys when the length is unknown
        number extends T['length']
        ? `${Key}`
        : never
      : `${Key}`
    : Key extends CollectionPrototypeKey<T>
      ? never
      : Key;

/** The keys of `T` that `Object.entries` doesn't skip */
type IncludedKey<T, Key = keyof T> = Key extends keyof T
  ? [EntryKey<T, Key>] extends [never]
    ? never
    : Key
  : never;

/** The values that `Object.entries` and `Object.values` give for `T` */
type EntryValue<T> = IsExactOptionalPropertyTypes extends true
  ? Required<T>[IncludedKey<T>]
  : // An optional property may be set to `undefined`, which `Required` removes
    T[IncludedKey<T>];

// `never` instead of `[never, never]` for an object without keys: generic code
// checks the entries of `T extends object` against those of `object`, and
// `[never, never]` would let their keys and values be assigned to anything
type Entry<T> = [EntryKey<T, keyof T>] extends [never]
  ? never
  : [EntryKey<T, keyof T>, EntryValue<T>];

/** An item of `Object.keys` for `T`, typed by each union member separately */
export type ObjectKey<T> = T extends unknown ? EntryKey<T, keyof T> : never;

/** An item of `Object.entries` for `T`, typed by each union member separately */
export type ObjectEntry<T> = T extends unknown ? Entry<T> : never;

/** An item of `Object.values` for `T`, typed by each union member separately */
export type ObjectValue<T> = T extends unknown ? EntryValue<T> : never;
