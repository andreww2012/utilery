import {setWith} from 'es-toolkit/compat';
import type {MaybeArray} from '../types/maybe-array.ts';

type CreateContainer = (nestedValue: unknown, key: string, nestedObject: object) => unknown;

/**
 * Sets the value at the given deep path of an object, creating any missing
 * intermediate containers along the way.
 * The path may be a single key, a dot/bracket path string like `'a.b[0].c'`, or
 * an array of segments.
 *
 * **Mutates** the input object and returns it.
 * When the fourth argument is omitted, missing containers are created with the
 * default strategy (arrays for numeric segments, plain objects otherwise).
 * When a `createContainer` customizer is provided, its return value is used for
 * each created container.
 * @param object - The object to mutate.
 * @param path - The path to set, as a key, a path string, or an array of segments.
 * @param value - The value to assign at `path`.
 * @param createContainer - Optional customizer invoked as
 * `(nestedValue, key, nestedObject)` for each created container; its return
 * value becomes the container.
 * @returns The mutated input object.
 * @example
 * // Creates intermediate objects as needed
 * setByPath({}, 'a.b.c', 1);
 * // {a: {b: {c: 1}}}
 * @example
 * // Numeric segments create arrays by default
 * setByPath({}, 'a[0].b', 1);
 * // {a: [{b: 1}]}
 * @example
 * // With a customizer: always create plain objects
 * setByPath({}, 'a[0].b', 1, () => ({}));
 * // {a: {0: {b: 1}}}
 */
export function setByPath<T extends object>(
  object: T,
  path: MaybeArray<PropertyKey>,
  value: unknown,
  createContainer: CreateContainer,
): T;
export function setByPath<T extends object>(
  object: T,
  path: MaybeArray<PropertyKey>,
  value: unknown,
): T;
export function setByPath<T extends object>(
  object: T,
  path: MaybeArray<PropertyKey>,
  value: unknown,
  createContainer?: CreateContainer,
): T {
  return setWith(object, path, value, createContainer);
}
