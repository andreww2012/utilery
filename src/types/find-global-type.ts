import type {FindGlobalType as FindGlobalTypeBase} from 'type-fest';

/**
 * The type of the global with the given name, or `never` when there is none.
 * Only globals declared with `var` are found, not those declared with `let` or
 * `const`.
 * For the instances of a global constructor, use `FindGlobalInstanceType`.
 * @example
 * declare global {
 *   var appVersion: string;
 * }
 * type A = FindGlobalType<'appVersion'>;
 * //=> string
 * type B = FindGlobalType<'missing'>;
 * //=> never
 */
export type FindGlobalType<Name extends string> = FindGlobalTypeBase<Name>;
