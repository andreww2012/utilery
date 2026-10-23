import type {ExcludeExactly as ExcludeExactlyBase} from 'type-fest';

/**
 * Removes the members of a union that are exactly the same as a member of
 * `Delete`.
 * Unlike `Exclude`, a member that is only assignable to `Delete` is kept, so
 * `string` removes no string literals and `any` removes nothing.
 * @example
 * type A = Exclude<'a' | 'b' | 1, string>;
 * //=> 1
 * type B = ExcludeExactly<'a' | 'b' | 1, string>;
 * //=> 'a' | 'b' | 1
 * type C = ExcludeExactly<{a: string} | {a: string; b: string}, {a: string}>;
 * //=> {a: string; b: string}
 */
export type ExcludeExactly<Union, Delete> = ExcludeExactlyBase<Union, Delete>;
