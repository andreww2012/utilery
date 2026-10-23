import {at} from 'es-toolkit';
import {arrayAt as arrayAtSingle} from 'ts-extras';
import type {MaybeArray} from '../types/maybe-array.ts';

/** The own positional index keys of a tuple, excluding inherited array members */
type TupleOwnIndexKey<ArrayType extends readonly unknown[]> = Extract<
  Exclude<keyof ArrayType, keyof (readonly unknown[])>,
  string | number
>;

/**
 * Element type of reading `ArrayType` at a single `Index`.
 * Unlike a bare `ArrayType[number] | undefined`, an in-bounds literal index
 * into a fixed tuple resolves to the precise element type without `undefined`;
 * regular arrays, non-literal indexes and out-of-bounds literal indexes keep
 * `| undefined`.
 * A literal `-1` resolves to the tuple's last element
 */
type ArrayElementAt<
  ArrayType extends readonly unknown[],
  Index extends number,
> = number extends Index
  ? ArrayType[number] | undefined
  : number extends ArrayType['length']
    ? ArrayType[number] | undefined
    : Index extends -1
      ? ArrayType extends readonly [...unknown[], infer Last]
        ? Last
        : ArrayType[number] | undefined
      : `${Index}` extends `${TupleOwnIndexKey<ArrayType>}`
        ? ArrayType[Index]
        : ArrayType[number] | undefined;

/**
 * Reads one or more elements from an array by index.
 * Combines two improved versions of `Array.prototype.at`: passing a single index
 * returns the element itself (with a precise type for literal indexes into
 * tuples), while passing an array of indexes returns a same-length array of
 * elements.
 * Negative indexes count from the end of the array, and out-of-bounds indexes
 * yield `undefined` in the corresponding slot.
 * @param array - The array to read from.
 * Not mutated.
 * @param indexes - Either a single index, or an array of indexes.
 * Negative values are counted from the end of the array.
 * @returns When `indexes` is a single number, the element at that index (or
 * `undefined` if out of bounds); for a tuple indexed by a literal, the precise
 * element type.
 * When `indexes` is an array, a new array of elements in the same order as the
 * requested indexes, with `undefined` in out-of-bounds slots.
 * @example
 * // Single index: returns the element directly
 * arrayAt(['a', 'b', 'c'], 1);
 * // 'b'
 * @example
 * // A literal index into a tuple yields a precise type (no `| undefined`)
 * const tuple = ['abc', 123, true] as const;
 * arrayAt(tuple, 0);
 * // 'abc' (type: 'abc')
 * @example
 * // Single index, out of bounds: returns undefined
 * arrayAt(['a', 'b', 'c'], 10);
 * // undefined
 * @example
 * // Negative single index counts from the end
 * arrayAt(['a', 'b', 'c'], -1);
 * // 'c'
 * @example
 * // Array of indexes: returns a same-length array
 * arrayAt(['a', 'b', 'c', 'd'], [0, 2]);
 * // ['a', 'c']
 * @example
 * // Array of indexes may mix positive, negative and out-of-bounds values
 * arrayAt(['a', 'b', 'c'], [0, -1, 10]);
 * // ['a', 'c', undefined]
 * @example
 * // An empty index array returns an empty array
 * arrayAt(['a', 'b', 'c'], []);
 * // []
 */
export function arrayAt<T>(array: readonly T[], indexes: number[]): (T | undefined)[];
export function arrayAt<ArrayType extends readonly unknown[], Index extends number>(
  array: ArrayType,
  index: Index,
): ArrayElementAt<ArrayType, Index>;
export function arrayAt(array: readonly unknown[], indexes: MaybeArray<number>): unknown {
  return Array.isArray(indexes) ? at(array, indexes) : arrayAtSingle(array, indexes);
}
