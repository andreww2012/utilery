import type {IsBooleanLiteral as IsBooleanLiteralBase} from 'type-fest';

/**
 * Whether a type is the `true` or the `false` literal type, not `boolean`.
 * @example
 * type A = IsBooleanLiteral<true>;
 * //=> true
 * type B = IsBooleanLiteral<boolean>;
 * //=> false
 */
export type IsBooleanLiteral<T> = IsBooleanLiteralBase<T>;
