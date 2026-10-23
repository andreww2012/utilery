import type {RequiredKeysOf as RequiredKeysOfBase} from 'type-fest';

/**
 * The union of the required keys of an object type.
 * For the optional keys, use `OptionalKeysOf`.
 * @example
 * type User = {name: string; email: string; age?: number};
 * type A = RequiredKeysOf<User>;
 * //=> 'name' | 'email'
 */
export type RequiredKeysOf<Type extends object> = RequiredKeysOfBase<Type>;
