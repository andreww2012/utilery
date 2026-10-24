import type {DistributedPick, KeysOfUnion} from 'type-fest';
import type {Prettify} from './prettify.ts';

/**
 * Keeps only the given keys of each member of a union of object types, keeping
 * the union.
 * `Pick` merges the members into one type, so narrowing by a discriminant no
 * longer works.
 * A key may come from any member, not only from all of them.
 * @example
 * type A = {kind: 'a'; foo: {bar: string}; extra: boolean};
 * type B = {kind: 'b'; foo: {baz: string}; extra: boolean};
 * type C = PickDistributed<A | B, 'kind' | 'foo'>;
 * //=> {kind: 'a'; foo: {bar: string}} | {kind: 'b'; foo: {baz: string}}
 *
 * declare const picked: C;
 * if (picked.kind === 'a') {
 *   picked.foo.bar; // string
 * }
 */
export type PickDistributed<ObjectType, KeyType extends KeysOfUnion<ObjectType>> = Prettify<
  DistributedPick<ObjectType, KeyType>
>;
