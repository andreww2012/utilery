import type {Entry} from 'type-fest';

/**
 * The type of one `[key, value]` pair that `entries` gives for an object
 * (`Object.entries`), an array, a `Map` or a `Set`.
 * For an object type, the key is the union of its keys, not `string`, and the
 * value is the union of its value types.
 * For the array of pairs, use `CollectionEntries`.
 * @example
 * type A = CollectionEntry<{a: number; b: string}>;
 * //=> ['a' | 'b', number | string]
 * type B = CollectionEntry<Set<string>>;
 * //=> [string, string]
 */
export type CollectionEntry<BaseType> = Entry<BaseType>;
