import type {NonNegative} from 'type-fest';

/**
 * `T` if it is a non-negative (zero or positive) number or bigint type,
 * otherwise `never`.
 * @example
 * type A = EnsureNonNegative<0>;
 * //=> 0
 * type B = EnsureNonNegative<2n>;
 * //=> 2n
 * type C = EnsureNonNegative<-1>;
 * //=> never
 */
export type EnsureNonNegative<T extends number | bigint> = NonNegative<T>;
