import type {ArrayReverse as ArrayReverseBase} from 'type-fest';
import type {UnknownArray} from './unknown-array.ts';

/**
 * Reverses the order of the elements of a tuple type, keeping `readonly`.
 * Optional elements give a union of tuples, one per possible length.
 * Their types include `undefined`, unless the `exactOptionalPropertyTypes`
 * compiler option is on.
 * An array type that is not a tuple is returned as is.
 * @example
 * type A = ArrayReverse<[string, number, boolean]>;
 * //=> [boolean, number, string]
 * type B = ArrayReverse<readonly [string, number, ...boolean[]]>;
 * //=> readonly [...boolean[], number, string]
 * type C = ArrayReverse<[string, number?]>;
 * //=> [string] | [number | undefined, string]
 */
export type ArrayReverse<TArray extends UnknownArray> = ArrayReverseBase<TArray>;
