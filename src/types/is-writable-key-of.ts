import type {IsWritableKeyOf as IsWritableKeyOfBase} from 'type-fest';

/**
 * Whether a key of an object type is writable (not `readonly`).
 * A union of keys, or a union of object types, where it is writable only in
 * some cases gives `boolean`.
 * For all such keys, use `WritableKeysOf`.
 * @example
 * type User = {readonly id: number; name: string};
 * type A = IsWritableKeyOf<User, 'name'>;
 * //=> true
 * type B = IsWritableKeyOf<User, 'id'>;
 * //=> false
 * type C = IsWritableKeyOf<User, 'id' | 'name'>;
 * //=> boolean
 */
export type IsWritableKeyOf<Type extends object, Key extends keyof Type> = IsWritableKeyOfBase<
  Type,
  Key
>;
