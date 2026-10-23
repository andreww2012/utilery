import type {IsNever as IsNeverBase} from 'type-fest';

/**
 * Whether a type is `never`.
 * Handy before a distributive conditional type, which gives `never` for
 * `never` instead of picking a branch.
 * @example
 * type A = IsNever<never>;
 * //=> true
 * type B = IsNever<unknown>;
 * //=> false
 * @example
 * type IsTrue<T> = IsNever<T> extends true ? false : T extends true ? true : false;
 * type C = IsTrue<never>;
 * //=> false
 */
export type IsNever<T> = IsNeverBase<T>;
