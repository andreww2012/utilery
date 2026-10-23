import {cloneDeep as cloneDeepFromEsToolkit, cloneDeepWith} from 'es-toolkit/object';

type CloneDeepCustomizer<T> = (
  value: unknown,
  key: PropertyKey | undefined,
  root: T,
  stack: Map<unknown, unknown>,
) => unknown;

/**
 * Creates a deep clone of the given value.
 * Handles primitives, plain objects, arrays, typed arrays, `Date`, `RegExp`,
 * `Map`, `Set`, `ArrayBuffer`, `DataView`, `Error`, `File`, `Blob`, and
 * circular references.
 *
 * When the second argument is omitted, the value is cloned with the default
 * strategy.
 * When a `cloneValue` function is provided, it is invoked for every visited
 * value and may return a replacement; returning `undefined` falls back to the
 * default strategy.
 * @param value - The value to clone.
 * Not mutated.
 * @param cloneValue - Optional customizer invoked as
 * `(value, key, root, stack)` for each visited value.
 * @returns A deep clone of `value`.
 * @example
 * // Basic deep clone of a nested object
 * const original = {a: 1, b: {c: 2}};
 * const cloned = cloneDeep(original);
 * cloned.b.c = 99;
 * // original.b.c is still 2
 * @example
 * // Cloning preserves built-in types
 * cloneDeep(new Map([['k', 1]]));
 * // new Map([['k', 1]])
 * @example
 * // With a customizer: double every numeric leaf
 * cloneDeep({a: 1, b: {c: 2}}, (value) => {
 *   if (typeof value === 'number') {
 *     return value * 2;
 *   }
 * });
 * // {a: 2, b: {c: 4}}
 */
export function cloneDeep<T>(value: T, cloneValue: CloneDeepCustomizer<T>): T;
export function cloneDeep<T>(value: T): T;
export function cloneDeep<T>(value: T, cloneValue?: CloneDeepCustomizer<T>): T {
  return cloneValue ? cloneDeepWith(value, cloneValue) : cloneDeepFromEsToolkit(value);
}
