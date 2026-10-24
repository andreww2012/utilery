import {cloneDeep, merge, mergeWith, toMerged} from 'es-toolkit/object';
import type {Merge} from 'es-toolkit/types';
import type {PrettifyObject} from '../_internal/types.ts';

type MergeValues<T, S> = (
  targetValue: unknown,
  sourceValue: unknown,
  key: string,
  target: T,
  source: S,
) => unknown;

interface MergeDeepOptions<T, S> {
  /**
   * Custom resolver invoked for every property as
   * `(targetValue, sourceValue, key, target, source)`.
   * Returning a value uses it for that property; returning `undefined` falls
   * back to the default deep merge
   */
  mergeValues?: MergeValues<T, S>;

  /**
   * When `true`, the target is left untouched and a new merged object is
   * returned.
   * When `false` (the default), the target is mutated in place
   */
  copy?: boolean;
}

/**
 * Recursively merges the properties of `source` into `target`.
 * Nested objects and arrays are merged deeply; a `source` property of
 * `undefined` never overwrites a defined `target` property.
 *
 * By default the `target` is **mutated** in place.
 * Pass `{copy: true}` to leave the `target` untouched and get a new object
 * back.
 * Pass `{mergeValues}` to control how individual properties are combined; the
 * two options compose.
 * @param target - The object merged into.
 * Mutated unless `{copy: true}` is set.
 * @param source - The object whose properties are merged into `target`.
 * @param options - Optional behavior flags.
 * @param options.mergeValues - Custom per-property merge resolver.
 * @param options.copy - When `true`, returns a new object instead of mutating `target`.
 * @returns The merged object: the mutated `target`, or a new object when `{copy: true}`.
 * @example
 * // Deep merge (mutating, the default)
 * mergeDeep({a: 1, b: {x: 1}}, {b: {y: 2}, c: 3});
 * // {a: 1, b: {x: 1, y: 2}, c: 3}
 * @example
 * // Immutable merge with `{copy: true}`
 * const target = {a: {x: 1}};
 * const result = mergeDeep(target, {a: {y: 2}}, {copy: true});
 * // result is {a: {x: 1, y: 2}}; target is still {a: {x: 1}}
 * @example
 * // With a custom resolver: concatenate arrays instead of merging by index
 * mergeDeep({list: [1, 2]}, {list: [3]}, {
 *   mergeValues: (targetValue, sourceValue) => {
 *     if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
 *       return [...targetValue, ...sourceValue];
 *     }
 *   },
 * });
 * // {list: [1, 2, 3]}
 */
export function mergeDeep<
  T extends Record<PropertyKey, unknown>,
  S extends Record<PropertyKey, unknown>,
>(target: T, source: S, options?: MergeDeepOptions<T, S> & {mergeValues?: undefined}): Merge<T, S>;
export function mergeDeep<
  T extends Record<PropertyKey, unknown>,
  S extends Record<PropertyKey, unknown>,
>(target: T, source: S, options?: MergeDeepOptions<T, S>): PrettifyObject<T & S>;
export function mergeDeep<
  T extends Record<PropertyKey, unknown>,
  S extends Record<PropertyKey, unknown>,
>(target: T, source: S, options?: MergeDeepOptions<T, S>): Merge<T, S> | (T & S) {
  const {mergeValues, copy} = options || {};

  if (copy) {
    return mergeValues
      ? mergeWith(cloneDeep(target), source, mergeValues)
      : toMerged(target, source);
  }

  return mergeValues ? mergeWith(target, source, mergeValues) : merge(target, source);
}
