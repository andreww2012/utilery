import type {Xor} from 'type-fest';

/**
 * Whether exactly one of two booleans is `true`: the logical XOR of two
 * values.
 * A `boolean` gives `boolean`, and `never` counts as `false`.
 * @example
 * type A = OrExclusive<true, false>;
 * //=> true
 * type B = OrExclusive<true, true>;
 * //=> false
 * type C = OrExclusive<false, boolean>;
 * //=> boolean
 */
export type OrExclusive<A extends boolean, B extends boolean> = Xor<A, B>;
