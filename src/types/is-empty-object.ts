import type {IsEmptyObject as IsEmptyObjectBase} from 'type-fest';

/**
 * Whether a type is the type of an empty plain object, `{}` (see
 * `EmptyObject`).
 * @example
 * type A = IsEmptyObject<{}>;
 * //=> true
 * type B = IsEmptyObject<[]>;
 * //=> false
 * type C = IsEmptyObject<{a?: string}>;
 * //=> false
 */
export type IsEmptyObject<T> = IsEmptyObjectBase<T>;
