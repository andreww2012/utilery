import type {Nullable as BaseNullable} from '@antfu/utils';

/**
 * Widens `T` to also allow the nullish values `null` and `undefined`, producing
 * `T | null | undefined`.
 * The inverse of `NonNullable`.
 * @example
 * type MaybeName = Nullable<string>; // string | null | undefined
 * @example
 * // Strip the nullish part back out
 * type Name = NonNullable<Nullable<string>>; // string
 */
export type Nullable<T> = BaseNullable<T>;
