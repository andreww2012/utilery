import type {And as AndBase} from 'type-fest';

/**
 * Whether both booleans are `true`: the logical AND of two values.
 * A `boolean` gives `boolean`, unless the other value is `false`.
 * A `never` gives `false`.
 * For more values, use `AndMulti`.
 * @example
 * type A = And<true, true>;
 * //=> true
 * type B = And<true, false>;
 * //=> false
 * type C = And<true, boolean>;
 * //=> boolean
 */
export type And<A extends boolean, B extends boolean> = AndBase<A, B>;
