import {updateWith} from 'es-toolkit/compat';
import type {MaybeArray} from '../types/maybe-array.ts';

type CreateContainer = (value: unknown, key: string, object: object) => unknown;

/**
 * Sets the value at the given deep path of an object to the result of applying
 * `updater` to the current value at that path, creating any missing
 * intermediate containers along the way.
 * The path may be a single key, a dot/bracket path string like `'a.b[0].c'`, or
 * an array of segments.
 *
 * **Mutates** the input object and returns it.
 * When the fourth argument is omitted, missing containers are created with the
 * default strategy.
 * When a `createContainer` customizer is provided, its return value is used for
 * each created container.
 * @param object - The object to mutate.
 * @param path - The path to update, as a key, a path string, or an array of segments.
 * @param updater - Function receiving the current value at `path` and returning the new value.
 * @param createContainer - Optional customizer invoked as
 * `(value, key, object)` for each created container; its return value becomes
 * the container.
 * @returns The mutated input object.
 * @example
 * // Increment an existing value
 * updateByPath({a: {b: 1}}, 'a.b', (value) => Number(value) + 1);
 * // {a: {b: 2}}
 * @example
 * // Missing intermediate containers are created
 * updateByPath({}, 'a.b.c', () => 1);
 * // {a: {b: {c: 1}}}
 * @example
 * // With a customizer: always create plain objects
 * updateByPath({}, 'a[0].b', () => 1, () => ({}));
 * // {a: {0: {b: 1}}}
 */
export function updateByPath<T extends object>(
  object: T,
  path: MaybeArray<PropertyKey>,
  updater: (value: unknown) => unknown,
  createContainer: CreateContainer,
): T;
export function updateByPath<T extends object>(
  object: T,
  path: MaybeArray<PropertyKey>,
  updater: (value: unknown) => unknown,
): T;
export function updateByPath<T extends object>(
  object: T,
  path: MaybeArray<PropertyKey>,
  updater: (value: unknown) => unknown,
  createContainer?: CreateContainer,
): T {
  return updateWith(object, path, updater, createContainer);
}
