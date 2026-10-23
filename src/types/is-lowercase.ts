import type {IsLowercase as IsLowercaseBase} from 'type-fest';

/**
 * Whether a string literal type is all lowercase.
 * The wide `string` type gives `boolean`.
 * @example
 * type A = IsLowercase<'abc'>;
 * //=> true
 * type B = IsLowercase<'Abc'>;
 * //=> false
 * type C = IsLowercase<string>;
 * //=> boolean
 */
export type IsLowercase<S extends string> = IsLowercaseBase<S>;
