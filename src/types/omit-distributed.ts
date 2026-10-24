import type {DistributedOmit, KeysOfUnion} from 'type-fest';
import type {Prettify} from './prettify.ts';

/**
 * Removes keys from each member of a union of object types, keeping the union.
 * `Omit` merges the members into one type with only their common properties,
 * so narrowing by a discriminant no longer works.
 * Unlike `OmitStrict`, a key may come from any member, not only from all of
 * them.
 * @example
 * type A = {kind: 'a'; foo: string; a: number};
 * type B = {kind: 'b'; foo: string; b: string};
 * type C = Omit<A | B, 'foo'>;
 * //=> {kind: 'a' | 'b'}
 * type D = OmitDistributed<A | B, 'foo'>;
 * //=> {kind: 'a'; a: number} | {kind: 'b'; b: string}
 */
export type OmitDistributed<ObjectType, KeyType extends KeysOfUnion<ObjectType>> = Prettify<
  DistributedOmit<ObjectType, KeyType>
>;
