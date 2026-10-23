import type {NegativeFloat} from 'type-fest';

/**
 * `T` if it is a negative number type that is not an integer, otherwise
 * `never`.
 * The same as `EnsureNegative<EnsureFloat<T>>`.
 * @example
 * type A = EnsureNegativeFloat<-1.5>;
 * //=> -1.5
 * type B = EnsureNegativeFloat<-1>;
 * //=> never
 */
export type EnsureNegativeFloat<T extends number> = NegativeFloat<T>;
