import type {Float} from 'type-fest';

/**
 * `T` if it is a number type that is not an integer, otherwise `never`.
 * Use it in a parameter type to reject integer literals at compile time.
 * `Infinity` is rejected too.
 * For integers, use `EnsureInteger`.
 * @example
 * type A = EnsureFloat<1.5>;
 * //=> 1.5
 * type B = EnsureFloat<1>;
 * //=> never
 * @example
 * declare function setRatio<T extends number>(ratio: EnsureFloat<T>): void;
 */
export type EnsureFloat<T> = Float<T>;
