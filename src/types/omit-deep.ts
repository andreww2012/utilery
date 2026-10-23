import type {LiteralUnion, OmitDeep as OmitDeepBase, Paths} from 'type-fest';

/**
 * Removes properties from an object type by their deep paths, like
 * `'a.b.c'`, including inside arrays and tuples.
 * A removed tuple element becomes `unknown`, as the positions of the next
 * elements must stay the same.
 * For top-level keys only, use `OmitStrict`.
 * @example
 * type Info = {user: {name: string; internal: {token: string}; notes: string}};
 * type A = OmitDeep<Info, 'user.internal' | 'user.notes'>;
 * //=> {user: {name: string}}
 * @example
 * type B = OmitDeep<{address: [{street: string; extra: string}]}, 'address.0.extra'>;
 * //=> {address: [{street: string}]}
 * type C = OmitDeep<[1, 'foo', 2], '1'>;
 * //=> [1, unknown, 2]
 */
export type OmitDeep<T, PathUnion extends LiteralUnion<Paths<T>, string>> = OmitDeepBase<
  T,
  PathUnion
>;
