import type {HasWritableKeys as HasWritableKeysBase} from 'type-fest';

/**
 * Whether an object type has properties that are not `readonly`.
 * For their keys, use `WritableKeysOf`.
 * @example
 * type A = HasWritableKeys<{readonly a: string; b: number}>;
 * //=> true
 * type B = HasWritableKeys<{readonly a: string}>;
 * //=> false
 */
export type HasWritableKeys<BaseType extends object> = HasWritableKeysBase<BaseType>;
