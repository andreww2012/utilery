import type {ExcludeRestElement} from 'type-fest';
import type {UnknownArray} from './unknown-array.ts';

/**
 * Removes the rest element from a tuple type, keeping the elements before and
 * after it.
 * For the type of the rest element, use `ArrayExtractRestElement`.
 * @example
 * type A = ArrayExcludeRestElement<[number, ...string[], 'last']>;
 * //=> [number, 'last']
 * type B = ArrayExcludeRestElement<[number, string]>;
 * //=> [number, string]
 */
export type ArrayExcludeRestElement<ArrayType extends UnknownArray> = ExcludeRestElement<ArrayType>;
