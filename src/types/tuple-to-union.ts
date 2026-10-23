import type {TupleToUnion as TupleToUnionBase} from 'type-fest';

/**
 * The union of the elements of an array or tuple type, or `never` for a type
 * that is not an array.
 * Handy to get the allowed values from a list declared `as const`, without
 * repeating them.
 * Unlike `T[number]`, it gives `never` instead of the characters of a string
 * or a compile error for other types.
 * @example
 * const destinations = ['a', 'b', 'c'] as const;
 * type Destination = TupleToUnion<typeof destinations>;
 * //=> 'a' | 'b' | 'c'
 */
export type TupleToUnion<ArrayType> = TupleToUnionBase<ArrayType>;
