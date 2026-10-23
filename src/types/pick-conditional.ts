import type {ConditionalPick} from 'type-fest';

/**
 * Keeps only the properties of an object type whose values are assignable to
 * `Condition`.
 * To remove them instead, use `OmitConditional`.
 * For nested properties too, use `PickConditionalDeep`.
 * @example
 * type Example = {a: string; b: string | number; c: () => void};
 * type A = PickConditional<Example, string>;
 * //=> {a: string}
 * @example
 * class User {
 *   constructor(public name: string, public age: number) {}
 *   greet() {}
 * }
 * type Data = PickConditional<User, Primitive>;
 * //=> {name: string; age: number}
 */
export type PickConditional<Base, Condition> = ConditionalPick<Base, Condition>;
