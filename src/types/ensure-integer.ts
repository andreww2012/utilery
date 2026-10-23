import type {Integer} from 'type-fest';

/**
 * `T` if it is an integer number type, otherwise `never`.
 * Use it in a parameter type to reject non-integer literals at compile time.
 * Integers written in other bases are recognized too.
 * For non-integers, use `EnsureFloat`.
 * @example
 * type A = EnsureInteger<1.0>;
 * //=> 1
 * type B = EnsureInteger<0x10>;
 * //=> 16
 * type C = EnsureInteger<1.5>;
 * //=> never
 * @example
 * declare function setYear<T extends number>(year: EnsureInteger<T>): void;
 * setYear(2024);
 * // @ts-expect-error: not an integer
 * setYear(2024.5);
 */
export type EnsureInteger<T> = Integer<T>;
