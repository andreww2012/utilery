import type {GreaterThanOrEqual as GreaterThanOrEqualBase} from 'type-fest';

/**
 * Whether the number literal type `A` is greater than or equal to `B`.
 * The wide `number` type on either side gives `boolean`.
 * @example
 * type A = GreaterThanOrEqual<1, -5>;
 * //=> true
 * type B = GreaterThanOrEqual<1, 1>;
 * //=> true
 * type C = GreaterThanOrEqual<1, 5>;
 * //=> false
 * @example
 * declare function setNonNegative<N extends number>(
 *   value: GreaterThanOrEqual<N, 0> extends true ? N : never,
 * ): void;
 * // @ts-expect-error: negative
 * setNonNegative(-1);
 */
export type GreaterThanOrEqual<A extends number, B extends number> = GreaterThanOrEqualBase<A, B>;
