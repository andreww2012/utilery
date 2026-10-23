import type {IsInteger as IsIntegerBase} from 'type-fest';

/**
 * Whether a number literal type is an integer, like `-5`, `1.0` or `0x10`.
 * `Infinity` is not an integer.
 * @example
 * type A = IsInteger<1.0>;
 * //=> true
 * type B = IsInteger<0b10>;
 * //=> true
 * type C = IsInteger<1.5>;
 * //=> false
 */
export type IsInteger<T> = IsIntegerBase<T>;
