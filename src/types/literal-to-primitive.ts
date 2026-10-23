import type {LiteralToPrimitive as LiteralToPrimitiveBase} from 'type-fest';

/**
 * Widens a literal type to the primitive type it belongs to, like `'a'` to
 * `string`, or gives `never` for a type that is not primitive.
 * For object and array types, use `LiteralToPrimitiveDeep`.
 * @example
 * type A = LiteralToPrimitive<'a'>;
 * //=> string
 * type B = LiteralToPrimitive<1n>;
 * //=> bigint
 * @example
 * declare function sum<T extends number | bigint>(a: T, b: T): LiteralToPrimitive<T>;
 * sum(1, 2);
 * //=> number
 */
export type LiteralToPrimitive<T> = LiteralToPrimitiveBase<T>;
