import type {UnwrapRequired as UnwrapRequiredBase} from 'type-fest';

/**
 * The object type `T` of a `Required<T>`, with its optional properties
 * optional again.
 * A type that is not a `Required`, or an array type, is returned as is.
 * @example
 * type FormData = Required<{email: string; message?: string}>;
 * type A = UnwrapRequired<FormData>;
 * //=> {email: string; message?: string}
 */
export type UnwrapRequired<RequiredObjectType> = UnwrapRequiredBase<RequiredObjectType>;
