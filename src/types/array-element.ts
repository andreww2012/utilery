import type {ArrayElement as ArrayElementBase} from 'type-fest';

/**
 * The element type of an array or a tuple, or `never` for a type that is not
 * an array.
 * For the elements of other iterables, like a `Set`, use `IterableElement`.
 * @example
 * type A = ArrayElement<string[]>;
 * //=> string
 * type B = ArrayElement<[1, 2, 3]>;
 * //=> 1 | 2 | 3
 * type C = ArrayElement<{a: string}>;
 * //=> never
 */
export type ArrayElement<T> = ArrayElementBase<T>;
