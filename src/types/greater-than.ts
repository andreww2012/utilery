import type {GreaterThan as GreaterThanBase} from 'type-fest';

/**
 * Whether the number literal type `A` is greater than `B`.
 * The wide `number` type on either side gives `boolean`.
 * @example
 * type A = GreaterThan<1, -5>;
 * //=> true
 * type B = GreaterThan<1, 1>;
 * //=> false
 * @example
 * declare function setPositive<N extends number>(
 *   value: GreaterThan<N, 0> extends true ? N : never,
 * ): void;
 * // @ts-expect-error: not positive
 * setPositive(0);
 */
export type GreaterThan<A extends number, B extends number> = GreaterThanBase<A, B>;
