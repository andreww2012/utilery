import type {Entries} from 'type-fest';

/**
 * The type of the array of `[key, value]` pairs that `entries` gives for an
 * object (`Object.entries`), an array, a `Map` or a `Set`.
 * For an object type, the key is the union of its keys, not `string`, and the
 * value is the union of its value types.
 * For a single pair, use `CollectionEntry`.
 * @example
 * type A = CollectionEntries<{a: number; b: string}>;
 * //=> ['a' | 'b', number | string][]
 * type B = CollectionEntries<Map<string, number>>;
 * //=> [string, number][]
 * type C = CollectionEntries<string[]>;
 * //=> [number, string][]
 */
export type CollectionEntries<BaseType> = Entries<BaseType>;
