import type {UnionToIntersection as UnionToIntersectionBase} from 'type-fest';

/**
 * Turns a union type into the intersection of its members.
 * @example
 * type A = UnionToIntersection<{a: string} | {b: number}>;
 * //=> {a: string} & {b: number}
 * type B = UnionToIntersection<((value: string) => void) | ((value: number) => void)>;
 * //=> ((value: string) => void) & ((value: number) => void)
 */
export type UnionToIntersection<Union> = UnionToIntersectionBase<Union>;
