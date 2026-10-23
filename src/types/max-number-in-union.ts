import type {UnionMax} from 'type-fest';

/**
 * The largest number in a union of number literal types.
 * Only small non-negative integers, `Infinity` and `-Infinity` are supported:
 * large integers or unions can reach the recursion limit of TypeScript.
 * `number`, `any` and `never` give themselves.
 * @example
 * const retryCounts = [0, 2, 5] as const;
 * type MaxRetries = MaxNumberInUnion<(typeof retryCounts)[number]>;
 * //=> 5
 * @example
 * type Unlimited = MaxNumberInUnion<1 | 5 | PositiveInfinity>;
 * //=> PositiveInfinity
 */
export type MaxNumberInUnion<NumberUnion extends number> = UnionMax<NumberUnion>;
