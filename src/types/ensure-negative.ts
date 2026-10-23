import type {Negative} from 'type-fest';

/**
 * `T` if it is a negative number or bigint type, otherwise `never`.
 * Use it in a parameter type to reject other literals at compile time.
 * @example
 * type A = EnsureNegative<-1>;
 * //=> -1
 * type B = EnsureNegative<-1n>;
 * //=> -1n
 * type C = EnsureNegative<0>;
 * //=> never
 */
export type EnsureNegative<T extends number | bigint> = Negative<T>;
