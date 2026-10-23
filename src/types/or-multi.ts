import type {OrAll} from 'type-fest';

/**
 * Whether any of the booleans of a tuple is `true`: the logical OR of any number
 * of values.
 * A `boolean` element gives `boolean`, unless another element is `true`.
 * A `never` element counts as `false`, `any` counts as `boolean`, and an empty
 * tuple gives `false`.
 * For two values, use `Or`.
 * @example
 * type A = OrMulti<[false, false, true]>;
 * //=> true
 * type B = OrMulti<[false, false]>;
 * //=> false
 * type C = OrMulti<[false, boolean]>;
 * //=> boolean
 */
export type OrMulti<T extends readonly boolean[]> = OrAll<T>;
