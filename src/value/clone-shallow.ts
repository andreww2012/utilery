import {cloneWith} from 'es-toolkit/compat';
import {clone} from 'es-toolkit/object';

type CloneShallowCustomizer<T> = (
  value: unknown,
  key: number | string | undefined,
  object: T,
  stack: unknown,
) => unknown;

/**
 * Creates a shallow clone of the given value.
 * Nested values are copied by reference; only the top level is duplicated.
 * Handles plain objects, arrays, and the common built-in types (`Date`,
 * `RegExp`, `Map`, `Set`, etc.).
 *
 * When the second argument is omitted, the value is cloned with the default
 * strategy.
 * When a `cloneValue` function is provided, it is invoked for every visited
 * value and may return a replacement; returning `undefined` falls back to the
 * default strategy.
 * @param value - The value to clone.
 * Not mutated.
 * @param cloneValue - Optional customizer invoked as
 * `(value, key, object, stack)` for each visited value.
 * @returns A shallow clone of `value`.
 * @example
 * // Basic shallow clone: nested references are shared
 * const original = {a: 1, b: {c: 2}};
 * const cloned = cloneShallow(original);
 * cloned.b === original.b;
 * // true
 * @example
 * // With a customizer: invoked once for the root value
 * cloneShallow([1, 2, 3], (value) => {
 *   if (Array.isArray(value)) {
 *     return value.map((item) => item * 2);
 *   }
 * });
 * // [2, 4, 6]
 */
export function cloneShallow<T>(value: T, cloneValue: CloneShallowCustomizer<T>): T;
export function cloneShallow<T>(value: T): T;
export function cloneShallow<T>(value: T, cloneValue?: CloneShallowCustomizer<T>): T {
  return cloneValue ? (cloneWith(value, cloneValue) as T) : clone(value);
}
