import type {HasRequiredKeys as HasRequiredKeysBase} from 'type-fest';

/**
 * Whether an object type has required properties.
 * Handy to make a property optional when its type has no required properties.
 * For their keys, use `RequiredKeysOf`.
 * @example
 * type A = HasRequiredKeys<{a: string; b?: number}>;
 * //=> true
 * type B = HasRequiredKeys<{b?: number}>;
 * //=> false
 * @example
 * type Options<Template extends object> = HasRequiredKeys<Template> extends true
 *   ? {template: Template}
 *   : {template?: Template};
 */
export type HasRequiredKeys<BaseType extends object> = HasRequiredKeysBase<BaseType>;
