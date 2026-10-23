import type {IsOptionalKeyOf as IsOptionalKeyOfBase} from 'type-fest';

/**
 * Whether a key of an object type is optional.
 * A union of keys, or a union of object types, where it is optional only in
 * some cases gives `boolean`.
 * For all the optional keys, use `OptionalKeysOf`.
 * @example
 * type User = {name: string; age?: number};
 * type A = IsOptionalKeyOf<User, 'age'>;
 * //=> true
 * type B = IsOptionalKeyOf<User, 'name'>;
 * //=> false
 * type C = IsOptionalKeyOf<User, 'name' | 'age'>;
 * //=> boolean
 */
export type IsOptionalKeyOf<Type extends object, Key extends keyof Type> = IsOptionalKeyOfBase<
  Type,
  Key
>;
