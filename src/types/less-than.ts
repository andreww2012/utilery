import type {LessThan as LessThanBase} from 'type-fest';

/**
 * Whether the number literal type `A` is less than `B`.
 * The wide `number` type on either side gives `boolean`.
 * @example
 * type A = LessThan<1, 5>;
 * //=> true
 * type B = LessThan<1, 1>;
 * //=> false
 * @example
 * declare function setNegative<N extends number>(
 *   value: LessThan<N, 0> extends true ? N : never,
 * ): void;
 * // @ts-expect-error: not negative
 * setNegative(0);
 */
export type LessThan<A extends number, B extends number> = LessThanBase<A, B>;
