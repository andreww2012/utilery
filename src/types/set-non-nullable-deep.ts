import type {Paths, SetNonNullableDeep as SetNonNullableDeepBase} from 'type-fest';

/**
 * Removes `null` and `undefined` from the properties of an object type at the
 * given deep paths, like `'a.b'`, including tuple elements, keeping the other
 * properties as they are.
 * Optional properties stay optional: to make them required too, combine it
 * with `SetRequiredDeep`.
 * For top-level keys only, use `SetNonNullable`.
 * @example
 * type User = {
 *   name: string;
 *   address: {city: string | undefined; street?: string | null};
 * };
 * type A = SetNonNullableDeep<User, 'address.city' | 'address.street'>;
 * //=> {name: string; address: {city: string; street?: string}}
 * @example
 * type B = SetNonNullableDeep<{a: [number | null, number | null]}, 'a.1'>;
 * //=> {a: [number | null, number]}
 */
export type SetNonNullableDeep<BaseType, KeyPaths extends Paths<BaseType>> = SetNonNullableDeepBase<
  BaseType,
  KeyPaths
>;
