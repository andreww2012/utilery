import type {WritableKeysOf as WritableKeysOfBase} from 'type-fest';

/**
 * The union of the keys of an object type that are not `readonly`.
 * For the `readonly` keys, use `ReadonlyKeysOf`.
 * @example
 * type User = {readonly id: number; name: string; email: string};
 * type A = WritableKeysOf<User>;
 * //=> 'name' | 'email'
 */
export type WritableKeysOf<Type extends object> = WritableKeysOfBase<Type>;
