import type {IsNumericLiteral as IsNumericLiteralBase} from 'type-fest';

/**
 * Whether a type is a number or bigint literal type, or a union of them.
 * A union of literal and wide types gives `boolean`.
 * @example
 * type A = IsNumericLiteral<0 | 10n>;
 * //=> true
 * type B = IsNumericLiteral<number>;
 * //=> false
 * type C = IsNumericLiteral<1 | bigint>;
 * //=> boolean
 */
export type IsNumericLiteral<T> = IsNumericLiteralBase<T>;
