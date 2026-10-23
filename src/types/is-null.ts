import type {IsNull as IsNullBase} from 'type-fest';

/**
 * Whether a type is `null`.
 * For a type that includes `null`, use `IsNullable`.
 * @example
 * type A = IsNull<null>;
 * //=> true
 * type B = IsNull<string | null>;
 * //=> false
 */
export type IsNull<T> = IsNullBase<T>;
