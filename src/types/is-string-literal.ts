import type {IsStringLiteral as IsStringLiteralBase} from 'type-fest';

/**
 * Whether a type is a string literal type, or a union of them.
 * A string type with infinitely many values, like `` `on${string}` `` or
 * `Uppercase<string>`, is not a literal.
 * A union of literal and wide types gives `boolean`.
 * @example
 * type A = IsStringLiteral<'foo' | 'bar'>;
 * //=> true
 * type B = IsStringLiteral<string>;
 * //=> false
 * type C = IsStringLiteral<`on${string}`>;
 * //=> false
 * type D = IsStringLiteral<'sm' | `${number}px`>;
 * //=> boolean
 */
export type IsStringLiteral<S> = IsStringLiteralBase<S>;
