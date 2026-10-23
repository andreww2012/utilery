import type {IsLiteral as IsLiteralBase} from 'type-fest';

/**
 * Whether a type is a literal type: a string, number, bigint, boolean or
 * `unique symbol` literal, or a union of them.
 * A union of literal and wide types gives `boolean`.
 * @example
 * type A = IsLiteral<'a' | 1>;
 * //=> true
 * type B = IsLiteral<string>;
 * //=> false
 * type C = IsLiteral<`on${string}`>;
 * //=> false
 * type D = IsLiteral<1n | string>;
 * //=> boolean
 */
export type IsLiteral<T> = IsLiteralBase<T>;
