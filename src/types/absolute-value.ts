import type {Absolute} from 'type-fest';

/**
 * The absolute value of a number or bigint literal type.
 * A non-literal type, like `number`, is returned as is.
 * @example
 * type A = AbsoluteValue<-1.5>;
 * //=> 1.5
 * type B = AbsoluteValue<-9999n>;
 * //=> 9999n
 * type C = AbsoluteValue<number>;
 * //=> number
 */
export type AbsoluteValue<N extends number | bigint> = Absolute<N>;
