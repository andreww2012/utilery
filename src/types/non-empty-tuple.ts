import type {NonEmptyTuple as NonEmptyTupleBase} from 'type-fest';

/**
 * A readonly array of `T` with at least one element.
 * For objects with at least one property, use `RequireAtLeastOne`.
 * @example
 * const sum = (...numbers: NonEmptyTuple<number>) =>
 *   numbers.reduce((total, value) => total + value);
 * sum(1, 2, 3);
 * // @ts-expect-error: no numbers
 * sum();
 */
export type NonEmptyTuple<T = unknown> = NonEmptyTupleBase<T>;
