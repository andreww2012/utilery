import type {IsSymbolLiteral as IsSymbolLiteralBase} from 'type-fest';

/**
 * Whether a type is a `unique symbol` type, or a union of them.
 * @example
 * declare const key: unique symbol;
 * type A = IsSymbolLiteral<typeof key>;
 * //=> true
 * type B = IsSymbolLiteral<symbol>;
 * //=> false
 */
export type IsSymbolLiteral<T> = IsSymbolLiteralBase<T>;
