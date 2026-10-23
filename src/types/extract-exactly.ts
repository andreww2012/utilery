import type {ExtractExactly as ExtractExactlyBase} from 'type-fest';

/**
 * Keeps the members of a union that are exactly the same as a member of
 * `Match`.
 * Unlike `Extract`, a member that is only assignable to `Match` is removed, so
 * `string` keeps no string literals and `any` keeps nothing.
 * @example
 * type A = Extract<'a' | 'b' | 1, string>;
 * //=> 'a' | 'b'
 * type B = ExtractExactly<'a' | 'b' | 1, string>;
 * //=> never
 * type C = ExtractExactly<{a: string} | {a: string; b: string}, {a: string}>;
 * //=> {a: string}
 */
export type ExtractExactly<Union, Match> = ExtractExactlyBase<Union, Match>;
