import type {IsNegative as IsNegativeBase} from 'type-fest';

/**
 * Whether a number or bigint literal type is negative.
 * @example
 * type A = IsNegative<-1>;
 * //=> true
 * type B = IsNegative<1n>;
 * //=> false
 * type C = IsNegative<0>;
 * //=> false
 */
export type IsNegative<T extends number | bigint> = IsNegativeBase<T>;
