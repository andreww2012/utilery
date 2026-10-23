import type {EmptyObject as EmptyObjectBase} from 'type-fest';

/**
 * The type of an empty plain object, `{}`.
 * The `{}` type itself means "any value except `null` and `undefined`", so it
 * also accepts arrays, numbers and objects with properties.
 * @example
 * const empty: EmptyObject = {};
 * // @ts-expect-error: not empty
 * const notEmpty: EmptyObject = {a: 1};
 * // @ts-expect-error: not an object
 * const notObject: EmptyObject = 42;
 */
export type EmptyObject = EmptyObjectBase;
