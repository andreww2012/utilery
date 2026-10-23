import type {IsUnion as IsUnionBase} from 'type-fest';

/**
 * Whether a type is a union of several types.
 * `boolean` is the union `true | false`.
 * @example
 * type A = IsUnion<string | number>;
 * //=> true
 * type B = IsUnion<string>;
 * //=> false
 */
export type IsUnion<T> = IsUnionBase<T>;
