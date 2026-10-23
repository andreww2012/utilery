import type {HasOptionalKeys as HasOptionalKeysBase} from 'type-fest';

/**
 * Whether an object type has optional properties.
 * For their keys, use `OptionalKeysOf`.
 * @example
 * type A = HasOptionalKeys<{a: string; b?: number}>;
 * //=> true
 * type B = HasOptionalKeys<{a: string}>;
 * //=> false
 */
export type HasOptionalKeys<BaseType extends object> = HasOptionalKeysBase<BaseType>;
