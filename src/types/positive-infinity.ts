import type {PositiveInfinity as PositiveInfinityBase} from 'type-fest';

/**
 * The type of `Infinity`, which TypeScript has no name for.
 * For `-Infinity`, use `NegativeInfinity`.
 * @example
 * const unlimited = Number.POSITIVE_INFINITY as PositiveInfinity;
 * type Limit = number | PositiveInfinity;
 */
export type PositiveInfinity = PositiveInfinityBase;
