import type {ExtractRestElement} from 'type-fest';
import type {UnknownArray} from './unknown-array.ts';

/**
 * The element type of the rest element of a tuple type, or `never` when it has
 * none.
 * An array type that is not a tuple is a rest element itself.
 * To remove the rest element instead, use `ArrayExcludeRestElement`.
 * @example
 * type A = ArrayExtractRestElement<[number, ...string[], 'last']>;
 * //=> string
 * type B = ArrayExtractRestElement<boolean[]>;
 * //=> boolean
 * type C = ArrayExtractRestElement<[number, string]>;
 * //=> never
 */
export type ArrayExtractRestElement<T extends UnknownArray> = ExtractRestElement<T>;
