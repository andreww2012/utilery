import type {IsUppercase as IsUppercaseBase} from 'type-fest';

/**
 * Whether a string literal type is all uppercase.
 * The wide `string` type gives `boolean`.
 * @example
 * type A = IsUppercase<'ABC'>;
 * //=> true
 * type B = IsUppercase<'Abc'>;
 * //=> false
 * type C = IsUppercase<string>;
 * //=> boolean
 */
export type IsUppercase<S extends string> = IsUppercaseBase<S>;
