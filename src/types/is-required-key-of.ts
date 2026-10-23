import type {IsRequiredKeyOf as IsRequiredKeyOfBase} from 'type-fest';

/**
 * Whether a key of an object type is required (not optional).
 * A union of keys, or a union of object types, where it is required only in
 * some cases gives `boolean`.
 * For all such keys, use `RequiredKeysOf`.
 * @example
 * type User = {name: string; age?: number};
 * type A = IsRequiredKeyOf<User, 'name'>;
 * //=> true
 * type B = IsRequiredKeyOf<User, 'age'>;
 * //=> false
 * type C = IsRequiredKeyOf<User, 'name' | 'age'>;
 * //=> boolean
 */
export type IsRequiredKeyOf<Type extends object, Key extends keyof Type> = IsRequiredKeyOfBase<
  Type,
  Key
>;
