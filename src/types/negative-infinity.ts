import type {NegativeInfinity as NegativeInfinityBase} from 'type-fest';

/**
 * The type of `-Infinity`, which TypeScript has no name for.
 * For `Infinity`, use `PositiveInfinity`.
 * @example
 * const lowest = Number.NEGATIVE_INFINITY as NegativeInfinity;
 * type A = IsNegative<NegativeInfinity>;
 * //=> true
 */
export type NegativeInfinity = NegativeInfinityBase;
