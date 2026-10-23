import type {UnwrapPartial as UnwrapPartialBase} from 'type-fest';

/**
 * The object type `T` of a `Partial<T>`, with its properties required again,
 * except those that were optional in `T`.
 * A type that is not a `Partial` is returned as is.
 * @example
 * type Config = Partial<{port: number; secure?: boolean}>;
 * type A = UnwrapPartial<Config>;
 * //=> {port: number; secure?: boolean}
 */
export type UnwrapPartial<PartialObjectType> = UnwrapPartialBase<PartialObjectType>;
