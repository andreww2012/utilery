import type {ConditionalExcept} from 'type-fest';

/**
 * Removes the properties of an object type whose values are assignable to
 * `Condition`.
 * To keep them instead, use `PickConditional`.
 * @example
 * type Example = {a: string; b: string | number; c: () => void};
 * type A = OmitConditional<Example, string>;
 * //=> {b: string | number; c: () => void}
 * @example
 * class User {
 *   constructor(public name: string, public age: number) {}
 *   greet() {}
 * }
 * type Methods = OmitConditional<User, Primitive>;
 * //=> {greet: () => void}
 */
export type OmitConditional<Base, Condition> = ConditionalExcept<Base, Condition>;
