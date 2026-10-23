import type {UnionToTuple as UnionToTupleBase} from 'type-fest';

/**
 * A tuple type of the members of a union type, in an unspecified order that
 * may change between TypeScript versions.
 * To check that a runtime list has every member exactly once, use
 * `allUnionMembers` instead.
 * @example
 * type A = UnionToTuple<1 | 2 | 3>;
 * //=> [1, 2, 3] (in some order)
 * @example
 * const pets = {dog: 1, cat: 2};
 * const petNames = Object.keys(pets) as UnionToTuple<keyof typeof pets>;
 */
export type UnionToTuple<Union> = UnionToTupleBase<Union>;
