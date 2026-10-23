import type {Sum as SumBase} from 'type-fest';

/**
 * The sum of two number literal types, `A + B`.
 * Both must be from `-999` to `999`, or `Infinity` or `-Infinity`.
 * An undefined result, like `Infinity + -Infinity`, gives `number`.
 * @example
 * type A = Sum<111, 222>;
 * //=> 333
 * type B = Sum<-111, 22>;
 * //=> -89
 */
export type Sum<A extends number, B extends number> = SumBase<A, B>;
