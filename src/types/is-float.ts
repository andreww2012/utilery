import type {IsFloat as IsFloatBase} from 'type-fest';

/**
 * Whether a number literal type is not an integer, like `1.5`.
 * `1.0` and `Infinity` are not floats.
 * @example
 * type A = IsFloat<1.5>;
 * //=> true
 * type B = IsFloat<1e-7>;
 * //=> true
 * type C = IsFloat<1.0>;
 * //=> false
 */
export type IsFloat<T> = IsFloatBase<T>;
