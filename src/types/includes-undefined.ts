import type {IsOptional} from 'type-fest';

/**
 * Whether a type includes `undefined`.
 * `null` does not count: for both, use `IsNullable`.
 * @example
 * type A = IncludesUndefined<string | undefined>;
 * //=> true
 * type B = IncludesUndefined<string | null>;
 * //=> false
 */
export type IncludesUndefined<T> = IsOptional<T>;
