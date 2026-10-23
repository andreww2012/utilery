import type {ObjectMerge} from 'type-fest';

/**
 * Merges two object types like object spread does at runtime, where the
 * properties of `Second` override those of `First`.
 * Unlike the type TypeScript infers for a spread or `Object.assign`, index
 * signatures are taken into account, so the result is sound, and it works for
 * type parameters too, where a spread gives an intersection.
 * For a simpler merge where `Second` always wins, use `MergeTypes`.
 * @example
 * type A = MergeObjects<{foo: string; bar: string}, {foo: number; baz: number}>;
 * //=> {foo: number; baz: number; bar: string}
 * @example
 * // `Second` may override `a` through its index signature
 * type B = MergeObjects<{a: string}, {[key: string]: number}>;
 * //=> {[key: string]: string | number; a: string | number}
 */
export type MergeObjects<First extends object, Second extends object> = ObjectMerge<First, Second>;
