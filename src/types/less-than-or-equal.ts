import type {LessThanOrEqual as LessThanOrEqualBase} from 'type-fest';

/**
 * Whether the number literal type `A` is less than or equal to `B`.
 * The wide `number` type on either side gives `boolean`.
 * @example
 * type A = LessThanOrEqual<1, 5>;
 * //=> true
 * type B = LessThanOrEqual<1, 1>;
 * //=> true
 * type C = LessThanOrEqual<1, -5>;
 * //=> false
 */
export type LessThanOrEqual<A extends number, B extends number> = LessThanOrEqualBase<A, B>;
