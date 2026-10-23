import type {Or as OrBase} from 'type-fest';

/**
 * Whether at least one of two booleans is `true`: the logical OR of two
 * values.
 * A `boolean` gives `boolean`, unless the other value is `true`.
 * A `never` counts as `false`.
 * For more values, use `OrMulti`.
 * @example
 * type A = Or<true, false>;
 * //=> true
 * type B = Or<false, false>;
 * //=> false
 * type C = Or<false, boolean>;
 * //=> boolean
 */
export type Or<A extends boolean, B extends boolean> = OrBase<A, B>;
