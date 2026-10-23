import type {IsUndefined as IsUndefinedBase} from 'type-fest';

/**
 * Whether a type is `undefined`.
 * For a type that includes `undefined`, use `IncludesUndefined`.
 * @example
 * type A = IsUndefined<undefined>;
 * //=> true
 * type B = IsUndefined<string | undefined>;
 * //=> false
 */
export type IsUndefined<T> = IsUndefinedBase<T>;
