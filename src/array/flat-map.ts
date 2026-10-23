import {flatMapDeep, flatMap as flatMapEs} from 'es-toolkit/array';
import type {ExtractNestedArrayType} from '../_internal/types.ts';

/**
 * Maps each element through `iteratee` and flattens the resulting arrays.
 * When the optional `depth` (third argument) is omitted (or explicitly set to
 * `Number.POSITIVE_INFINITY`), the result is *fully* flattened.
 * This deviates from `Array.prototype.flatMap`, whose default depth is `1`.
 * Passing a finite `depth` flattens to exactly that level; omitting it or
 * passing `Infinity` flattens fully.
 *
 * Negative, `NaN`, and non-integer `depth` values follow
 * `Array.prototype.flat` semantics (negative/`NaN` → no flattening, non-integer
 * → floored).
 *
 * For an async iteratee, use `flatMapAsync` instead.
 * @param array - The array to map and flatten.
 * @param iteratee - Produces the new array elements.
 * Receives the item, its index, and the source array.
 * @returns A new array with the mapped, flattened elements.
 * @example
 * // Default: deep flatten
 * flatMap([1, 2, 3], (n) => [[n, n]]);
 * // [1, 1, 2, 2, 3, 3]
 * @example
 * // Explicit depth of 1: matches `Array.prototype.flatMap`'s default
 * flatMap([1, 2, 3], (n) => [[n, n]], 1);
 * // [[1, 1], [2, 2], [3, 3]]
 * @example
 * // Depth of 2 flattens two levels
 * flatMap([1, 2], (n) => [[[n, n]]], 2);
 * // [[1, 1], [2, 2]]
 * @example
 * // Depth of 0 just maps: no flattening
 * flatMap([1, 2], (n) => [n, n], 0);
 * // [[1, 1], [2, 2]]
 * @example
 * // `Infinity` is equivalent to omitting `depth`
 * flatMap([[1, [2, [3, [4]]]]], (item) => item, Number.POSITIVE_INFINITY);
 * // [1, 2, 3, 4]
 * @example
 * // The iteratee receives (item, index, array)
 * flatMap(['a', 'b'], (item, index) => [item, index]);
 * // ['a', 0, 'b', 1]
 */
export function flatMap<T, U>(
  array: readonly T[],
  iteratee: (item: T, index: number, array: readonly T[]) => U,
): ExtractNestedArrayType<U>[];

/**
 * Maps each element through `iteratee` and flattens the resulting arrays to the
 * given `depth`.
 * Negative, `NaN`, and non-integer `depth` values follow
 * `Array.prototype.flat` semantics (negative/`NaN` → no flattening, non-integer
 * → floored).
 * @param array - The array to map and flatten.
 * @param iteratee - Produces the new array elements.
 * Receives the item, its index, and the source array.
 * @param depth - How many levels to flatten.
 * `Infinity` flattens fully.
 * @returns A new array with the mapped elements, flattened to `depth`.
 * @example
 * // Depth of 1: matches `Array.prototype.flatMap`
 * flatMap([1, 2, 3], (n) => [[n, n]], 1);
 * // [[1, 1], [2, 2], [3, 3]]
 * @example
 * // Depth of 0 just maps: no flattening
 * flatMap([1, 2], (n) => [n, n], 0);
 * // [[1, 1], [2, 2]]
 */
export function flatMap<T, U, D extends number>(
  array: readonly T[],
  iteratee: (item: T, index: number, array: readonly T[]) => U,
  depth: D,
): FlatArray<U[], D>[];
export function flatMap<T, U>(
  array: readonly T[],
  iteratee: (item: T, index: number, array: readonly T[]) => U,
  depth?: number,
): unknown[] {
  return depth == null || depth === Number.POSITIVE_INFINITY
    ? flatMapDeep(array, iteratee)
    : flatMapEs(array, iteratee, depth);
}
