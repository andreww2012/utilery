import type {IsAny as IsAnyBase} from 'type-fest';

/**
 * Whether a type is `any`.
 * Handy to handle `any` on its own in a type utility.
 * @example
 * type A = IsAny<any>;
 * //=> true
 * type B = IsAny<unknown>;
 * //=> false
 * type C = IsAny<string>;
 * //=> false
 */
export type IsAny<T> = IsAnyBase<T>;
