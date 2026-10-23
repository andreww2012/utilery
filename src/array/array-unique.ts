import {uniqBy, uniqWith} from 'es-toolkit/array';

/**
 * Returns a new array with duplicate elements removed.
 * The strategy used for the equality check depends on the optional second
 * argument:
 *
 * - When omitted, items are compared using `SameValueZero` (the same semantics
 *   as `Set.prototype.has`).
 * - When a binary function `(a, b) => boolean` is passed, it is used as a
 *   custom comparator.
 * - When a unary function `(value) => key` is passed, items are mapped through
 *   it and the resulting keys are compared.
 * @param array - The array to deduplicate.
 * Not mutated.
 * @returns A new array containing only the first occurrence of each unique element.
 * @example
 * // Basic equality (SameValueZero)
 * arrayUnique([1, 2, 1, 3, 2]);
 * // [1, 2, 3]
 * @example
 * // With a mapper: deduplicate by a derived key
 * arrayUnique([{id: 1, v: 'a'}, {id: 2, v: 'b'}, {id: 1, v: 'c'}], (item) => item.id);
 * // [{id: 1, v: 'a'}, {id: 2, v: 'b'}]
 * @example
 * // With a custom comparator
 * arrayUnique([{id: 1}, {id: 2}, {id: 1}], (a, b) => a.id === b.id);
 * // [{id: 1}, {id: 2}]
 */
export function arrayUnique<T>(array: readonly T[]): T[];

/**
 * Returns a new array with duplicate elements removed, comparing elements with
 * a custom function.
 * @param array - The array to deduplicate.
 * Not mutated.
 * @param areItemsEqual - Tells whether two elements are equal: `a` is an earlier element and `b` a
 * later one.
 * @returns A new array containing only the first occurrence of each unique element.
 * @example
 * arrayUnique([{id: 1}, {id: 2}, {id: 1}], (a, b) => a.id === b.id);
 * // [{id: 1}, {id: 2}]
 */
export function arrayUnique<T>(array: readonly T[], areItemsEqual: (a: T, b: T) => boolean): T[];

/**
 * Returns a new array with duplicate elements removed, comparing the keys a
 * function maps them to.
 * @param array - The array to deduplicate.
 * Not mutated.
 * @param mapper - Maps an element to the key to compare.
 * @returns A new array containing only the first element for each unique key.
 * @example
 * arrayUnique([{id: 1, v: 'a'}, {id: 2, v: 'b'}, {id: 1, v: 'c'}], (item) => item.id);
 * // [{id: 1, v: 'a'}, {id: 2, v: 'b'}]
 */
export function arrayUnique<T>(array: readonly T[], mapper: (value: T) => unknown): T[];
export function arrayUnique<T>(
  array: readonly T[],
  fn?: ((value: T) => unknown) | ((a: T, b: T) => boolean),
): T[] {
  if (!fn) {
    return [...new Set(array)];
  }

  return fn.length === 2
    ? uniqWith(array, fn as (a: T, b: T) => boolean)
    : uniqBy(array, fn as (value: T) => unknown);
}
