import type {HasReadonlyKeys as HasReadonlyKeysBase} from 'type-fest';

/**
 * Whether an object type has `readonly` properties.
 * For their keys, use `ReadonlyKeysOf`.
 * @example
 * type A = HasReadonlyKeys<{readonly a: string; b: number}>;
 * //=> true
 * type B = HasReadonlyKeys<{a: string}>;
 * //=> false
 */
export type HasReadonlyKeys<BaseType extends object> = HasReadonlyKeysBase<BaseType>;
