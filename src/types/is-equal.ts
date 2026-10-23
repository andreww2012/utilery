import type {IsEqual as IsEqualBase} from 'type-fest';

/**
 * Whether two types are exactly the same, as opposed to assignable to each
 * other: `any` only equals `any`, and even `{a: 1} & {b: 2}` doesn't equal
 * `{a: 1; b: 2}`.
 * @example
 * type A = IsEqual<string, string>;
 * //=> true
 * type B = IsEqual<1, number>;
 * //=> false
 * type C = IsEqual<any, unknown>;
 * //=> false
 */
export type IsEqual<A, B> = IsEqualBase<A, B>;
