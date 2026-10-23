import type {IsReadonlyKeyOf as IsReadonlyKeyOfBase} from 'type-fest';

/**
 * Whether a key of an object type is `readonly`.
 * A union of keys, or a union of object types, where it is `readonly` only in
 * some cases gives `boolean`.
 * For all such keys, use `ReadonlyKeysOf`.
 * @example
 * type User = {readonly id: number; name: string};
 * type A = IsReadonlyKeyOf<User, 'id'>;
 * //=> true
 * type B = IsReadonlyKeyOf<User, 'name'>;
 * //=> false
 * type C = IsReadonlyKeyOf<User, 'id' | 'name'>;
 * //=> boolean
 */
export type IsReadonlyKeyOf<Type extends object, Key extends keyof Type> = IsReadonlyKeyOfBase<
  Type,
  Key
>;
