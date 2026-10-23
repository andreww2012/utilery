import type {LastArrayElement} from 'type-fest';
import type {UnknownArray} from './unknown-array.ts';

/**
 * The type of the last element of an array or a tuple type.
 * When the last position is not fixed, because of optional or rest elements,
 * it is the union of the types that may be last.
 * When the array may be empty, it includes `undefined`, like `[].at(-1)`.
 * An optional element adds `undefined` too, unless the
 * `exactOptionalPropertyTypes` compiler option is on.
 * @example
 * type A = ArrayLastElement<['foo', 'bar']>;
 * //=> 'bar'
 * type B = ArrayLastElement<[string, number?]>;
 * //=> string | number | undefined
 * type C = ArrayLastElement<string[]>;
 * //=> string | undefined
 */
export type ArrayLastElement<TArray extends UnknownArray> = LastArrayElement<TArray>;
