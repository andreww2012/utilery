import type {ConditionalKeys as ConditionalKeysBase} from 'type-fest';

/**
 * The keys of an object type whose values are assignable to `Condition`.
 * For an optional key, include `undefined` in `Condition`.
 * For a tuple, the indexes are given as strings.
 * To pick or omit the matching properties, use `PickConditional` or
 * `OmitConditional`.
 * @example
 * type Example = {a: string; b: string | number; c?: string};
 * type A = ConditionalKeys<Example, string>;
 * //=> 'a'
 * type B = ConditionalKeys<Example, string | undefined>;
 * //=> 'a' | 'c'
 * type C = ConditionalKeys<[string, number, string], string>;
 * //=> '0' | '2'
 */
export type ConditionalKeys<Base, Condition> = ConditionalKeysBase<Base, Condition>;
