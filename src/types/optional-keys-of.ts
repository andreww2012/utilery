import type {OptionalKeysOf as OptionalKeysOfBase} from 'type-fest';

/**
 * The union of the optional keys of an object type.
 * For the required keys, use `RequiredKeysOf`.
 * @example
 * type User = {name: string; age?: number; email?: string};
 * type A = OptionalKeysOf<User>;
 * //=> 'age' | 'email'
 */
export type OptionalKeysOf<Type extends object> = OptionalKeysOfBase<Type>;
