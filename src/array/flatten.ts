import {flattenDeep, flatten as flattenEs} from 'es-toolkit/array';
import type {ExtractNestedArrayType} from '../_internal/types.ts';

/**
 * Flattens a nested array.
 * When the optional `depth` is omitted (or explicitly set to
 * `Number.POSITIVE_INFINITY`), the result is *fully* flattened.
 * This deviates from `Array.prototype.flat`, whose default depth is `1`.
 * Passing a finite `depth` flattens to exactly that level; omitting it or
 * passing `Infinity` flattens fully.
 *
 * Negative, `NaN`, and non-integer `depth` values follow
 * `Array.prototype.flat` semantics (negative/`NaN` → no flattening, non-integer
 * → floored).
 * @param array - The array to flatten.
 * @returns A new array with the flattened elements.
 * @example
 * // Default: deep flatten
 * flatten([1, [2, [3, [4]]]]);
 * // [1, 2, 3, 4]
 * @example
 * // Explicit depth of 1: matches `Array.prototype.flat`'s default
 * flatten([1, [2, [3, [4]]]], 1);
 * // [1, 2, [3, [4]]]
 * @example
 * // Depth of 2 flattens two levels
 * flatten([1, [2, [3, [4]]]], 2);
 * // [1, 2, 3, [4]]
 * @example
 * // Depth of 0 returns a shallow copy
 * flatten([1, [2, 3]], 0);
 * // [1, [2, 3]]
 * @example
 * // `Infinity` is equivalent to omitting `depth`
 * flatten([1, [2, [3, [4]]]], Number.POSITIVE_INFINITY);
 * // [1, 2, 3, 4]
 */
export function flatten<T>(array: readonly T[]): ExtractNestedArrayType<T>[];
export function flatten<T, D extends number>(array: readonly T[], depth: D): FlatArray<T[], D>[];
export function flatten<T>(array: readonly T[], depth?: number): unknown[] {
  return depth == null || depth === Number.POSITIVE_INFINITY
    ? flattenDeep(array)
    : flattenEs(array, depth);
}
