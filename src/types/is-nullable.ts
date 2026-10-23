import type {IsNullable as IsNullableBase} from 'type-fest';

/**
 * Whether a type includes `null`.
 * `undefined` does not count: for it, use `IncludesUndefined`.
 * @example
 * type A = IsNullable<string | null>;
 * //=> true
 * type B = IsNullable<string | undefined>;
 * //=> false
 */
export type IsNullable<T> = IsNullableBase<T>;
