import type {Paths, SetRequiredDeep as SetRequiredDeepBase} from 'type-fest';

/**
 * Makes the properties of an object type at the given deep paths, like
 * `'a.b'`, required, including tuple elements, keeping the other properties as
 * they are.
 * For top-level keys only, use `SetRequired`.
 * @example
 * type Foo = {a?: number; b?: string; c?: {d?: number}[]};
 * type A = SetRequiredDeep<Foo, 'a' | `c.${number}.d`>;
 * //=> {a: number; b?: string; c?: {d: number}[]}
 * type B = SetRequiredDeep<{a: [number?, number?, number?]}, 'a.0' | 'a.1'>;
 * //=> {a: [number, number, number?]}
 */
export type SetRequiredDeep<BaseType, KeyPaths extends Paths<BaseType>> = SetRequiredDeepBase<
  BaseType,
  KeyPaths
>;
