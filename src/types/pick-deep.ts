import type {Paths, PickDeep as PickDeepBase} from 'type-fest';

/**
 * Keeps only the properties of an object type at the given deep paths, like
 * `'a.b.c'`, along with the objects on the way to them, including inside
 * arrays and tuples.
 * The tuple elements before a kept one become `unknown`, as the positions must
 * stay the same.
 * For top-level keys only, use `Pick`.
 * @example
 * type Config = {
 *   user: {name: string; age: number; addresses: [{city: string}, {street: string; zip: string}]};
 *   other: boolean;
 * };
 * type A = PickDeep<Config, 'user.name'>;
 * //=> {user: {name: string}}
 * type B = PickDeep<Config, 'user.addresses.1.street'>;
 * //=> {user: {addresses: [unknown, {street: string}]}}
 */
export type PickDeep<T, PathUnion extends Paths<T>> = PickDeepBase<T, PathUnion>;
