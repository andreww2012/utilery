import type {ArrayTail as ArrayTailBase} from 'type-fest';
import type {UnknownArray} from './unknown-array.ts';

/**
 * A tuple type without its first element, keeping `readonly`.
 * An empty tuple, an array type that is not a tuple, and a tuple that starts
 * with a rest element are returned as is.
 * @example
 * type A = ArrayTail<[1, 2, 3]>;
 * //=> [2, 3]
 * type B = ArrayTail<readonly [1, 2, 3?, ...string[]]>;
 * //=> readonly [2, 3?, ...string[]]
 * type C = ArrayTail<string[]>;
 * //=> string[]
 */
export type ArrayTail<TArray extends UnknownArray> = ArrayTailBase<TArray>;
