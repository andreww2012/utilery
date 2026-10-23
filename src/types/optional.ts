import type {Optional as OptionalBase} from 'type-fest';

/**
 * A type plus `undefined`, without `null`.
 * Handy to use `undefined` alone for "no value", like when converting the
 * values of an API that uses `null`.
 * For `null` and `undefined` together, use `Nullable`.
 * @example
 * type A = Optional<number>;
 * //=> number | undefined
 * type B = Optional<string | null>;
 * //=> string | undefined
 */
export type Optional<Value> = OptionalBase<Value>;
