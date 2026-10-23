import type {ReadonlyKeysOf as ReadonlyKeysOfBase} from 'type-fest';

/**
 * The union of the `readonly` keys of an object type.
 * For the other keys, use `WritableKeysOf`.
 * @example
 * type User = {readonly id: number; name: string};
 * type A = ReadonlyKeysOf<User>;
 * //=> 'id'
 */
export type ReadonlyKeysOf<Type extends object> = ReadonlyKeysOfBase<Type>;
