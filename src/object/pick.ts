import {pick as pickKeys} from 'es-toolkit/compat';
import {pickBy} from 'es-toolkit/object';
import type {ObjectKeys} from 'es-toolkit/types';
import type {Prettify} from '../types/prettify.ts';

/**
 * Creates a new object with only the selected properties of `object`.
 *
 * The selection can be made in three ways via the second argument:
 *
 * - An array of top-level keys: precisely typed as `Pick<T, K>`.
 * - An array of deep path strings like `'a.b.c'`: selects nested properties
 *   (typed loosely as `Partial<T>`).
 * - A `(value, key) => boolean` predicate: keeps the properties for which it
 *   returns `true`.
 * @param object - The source object.
 * Not mutated.
 * @param keys - The keys/paths to keep, or a `(value, key) => boolean` predicate selecting them.
 * @returns A new object containing only the selected properties.
 * @example
 * // Top-level keys (precisely typed)
 * pick({a: 1, b: 2, c: 3}, ['a', 'c']);
 * // {a: 1, c: 3}
 * @example
 * // Deep path strings
 * pick({a: {b: 1, c: 2}}, ['a.b']);
 * // {a: {b: 1}}
 * @example
 * // With a predicate: keep string-valued properties
 * pick({a: 1, b: 'keep', c: 3}, (value) => typeof value === 'string');
 * // {b: 'keep'}
 */
export function pick<T extends object, K extends keyof T>(
  object: T,
  keys: readonly K[],
): Prettify<Pick<T, K>>;

/**
 * Creates a new object with only the selected properties of `object`, chosen
 * by deep path strings or a predicate.
 * @param object - The source object.
 * Not mutated.
 * @param selector - Deep path strings like `'a.b.c'` of the properties to keep, or a
 * `(value, key) => boolean` predicate that returns `true` for them.
 * @returns A new object containing only the selected properties, typed loosely as `Partial<T>`.
 * @example
 * pick({a: {b: 1, c: 2}}, ['a.b']);
 * // {a: {b: 1}}
 * @example
 * pick({a: 1, b: 'keep', c: 3}, (value) => typeof value === 'string');
 * // {b: 'keep'}
 */
export function pick<T extends object>(
  object: T,
  selector: readonly PropertyKey[] | ((value: T[keyof T], key: ObjectKeys<T>) => boolean),
): Prettify<Partial<T>>;
export function pick<T extends object>(
  object: T,
  selector: readonly PropertyKey[] | ((value: T[keyof T], key: ObjectKeys<T>) => boolean),
): Partial<T> {
  return typeof selector === 'function'
    ? pickBy(object, selector)
    : pickKeys(object, [...selector]);
}
