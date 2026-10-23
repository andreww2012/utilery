import type {UnionLength as UnionLengthBase} from 'type-fest';

/**
 * The number of members of a union type.
 * `never` gives `0`, and `any` gives `1`.
 * @example
 * type A = UnionLength<'foo' | 'bar' | 'baz'>;
 * //=> 3
 * type B = UnionLength<string[] | {x: string}>;
 * //=> 2
 */
export type UnionLength<Union> = UnionLengthBase<Union>;
