import type {Subtract as SubtractBase} from 'type-fest';

/**
 * The difference of two number literal types, `A - B`.
 * Both must be from `-999` to `999`, or `Infinity` or `-Infinity`.
 * An undefined result, like `Infinity - Infinity`, gives `number`.
 * @example
 * type A = Subtract<333, 222>;
 * //=> 111
 * type B = Subtract<18, 96>;
 * //=> -78
 */
export type Subtract<A extends number, B extends number> = SubtractBase<A, B>;
