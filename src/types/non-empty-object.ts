import type {NonEmptyObject as NonEmptyObjectBase} from 'type-fest';

/**
 * An object type that must have at least one of the properties of `T`: handy
 * when all of them are optional, like in an update request.
 * To check whether an object type is empty, use `IsEmptyObject`.
 * @example
 * type User = {name: string; email: string};
 * type UserUpdate = NonEmptyObject<Partial<User>>;
 * const update: UserUpdate = {name: 'Ada'};
 * // @ts-expect-error: no properties
 * const empty: UserUpdate = {};
 */
export type NonEmptyObject<T extends object> = NonEmptyObjectBase<T>;
