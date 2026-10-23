import type {AndAll} from 'type-fest';

/**
 * Whether all the booleans of a tuple are `true`: the logical AND of any number
 * of values.
 * A `boolean` element gives `boolean`, unless another element is `false`.
 * A `never` element gives `false`, `any` counts as `boolean`, and an empty
 * tuple gives `true`.
 * For two values, use `And`.
 * @example
 * type A = AndMulti<[true, true, true]>;
 * //=> true
 * type B = AndMulti<[true, false, true]>;
 * //=> false
 * type C = AndMulti<[true, boolean]>;
 * //=> boolean
 */
export type AndMulti<T extends readonly boolean[]> = AndAll<T>;
