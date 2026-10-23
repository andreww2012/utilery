import type {IsUnknown as IsUnknownBase} from 'type-fest';

/**
 * Whether a type is `unknown`.
 * `any` is not `unknown`.
 * @example
 * type A = IsUnknown<unknown>;
 * //=> true
 * type B = IsUnknown<any>;
 * //=> false
 */
export type IsUnknown<T> = IsUnknownBase<T>;
