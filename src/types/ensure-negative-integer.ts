import type {NegativeInteger} from 'type-fest';

/**
 * `T` if it is a negative integer number type, otherwise `never`.
 * The same as `EnsureNegative<EnsureInteger<T>>`.
 * Bigints are always integers: use `EnsureNegative` for them.
 * @example
 * type A = EnsureNegativeInteger<-1>;
 * //=> -1
 * type B = EnsureNegativeInteger<-1.5>;
 * //=> never
 * type C = EnsureNegativeInteger<0>;
 * //=> never
 */
export type EnsureNegativeInteger<T extends number> = NegativeInteger<T>;
