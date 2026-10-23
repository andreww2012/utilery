import {findDuplicates} from '../_internal/find-duplicates.ts';

/**
 * Checks whether no element of the array repeats another one, stopping at the
 * first repeat.
 * The strategy used for the equality check depends on the optional second
 * argument:
 *
 * - When omitted, items are compared using `SameValueZero` (the same semantics
 *   as `Set.prototype.has`).
 * - When a binary function `(a, b) => boolean` is passed, it is used as a
 *   custom comparator.
 * - When a unary function `(value) => key` is passed, items are mapped through
 *   it and the resulting keys are compared.
 *
 * A second argument that is not a function is ignored, so the utility can be
 * passed directly as a callback, e.g. `arrays.filter(arrayIsUnique)`.
 *
 * To get the repeated elements, use `arrayFindDuplicates`.
 * @param array - The array to check.
 * Not mutated.
 * @returns `true` if every element is unique (including for an empty array), otherwise `false`.
 * @example
 * // Basic equality (SameValueZero)
 * arrayIsUnique([1, 2, 3]);
 * // true
 * arrayIsUnique([1, 2, 1]);
 * // false
 * @example
 * // With a mapper: check uniqueness of a derived key
 * arrayIsUnique([{id: 1}, {id: 2}, {id: 1}], (item) => item.id);
 * // false
 * @example
 * // With a custom comparator
 * arrayIsUnique(['a', 'A'], (a, b) => a.toLowerCase() === b.toLowerCase());
 * // false
 * @example
 * // As a callback
 * [[1, 2], [3, 3]].filter(arrayIsUnique);
 * // [[1, 2]]
 */
export function arrayIsUnique(array: readonly unknown[]): boolean;

/**
 * Checks whether no element of the array repeats another one, comparing
 * elements with a custom function.
 * Stops at the first repeat.
 * @param array - The array to check.
 * Not mutated.
 * @param areItemsEqual - Tells whether two elements are equal.
 * @returns `true` if every element is unique (including for an empty array), otherwise `false`.
 * @example
 * arrayIsUnique(['a', 'A'], (a, b) => a.toLowerCase() === b.toLowerCase());
 * // false
 */
export function arrayIsUnique<T>(
  array: readonly T[],
  areItemsEqual: (a: T, b: T) => boolean,
): boolean;

/**
 * Checks whether no element of the array repeats another one, comparing the
 * keys a function maps them to.
 * Stops at the first repeat.
 * @param array - The array to check.
 * Not mutated.
 * @param mapper - Maps an element to the key to compare.
 * @returns `true` if every element is unique (including for an empty array), otherwise `false`.
 * @example
 * arrayIsUnique([{id: 1}, {id: 2}, {id: 1}], (item) => item.id);
 * // false
 */
export function arrayIsUnique<T>(array: readonly T[], mapper: (value: T) => unknown): boolean;
export function arrayIsUnique<T>(
  array: readonly T[],
  fn?: ((value: T) => unknown) | ((a: T, b: T) => boolean),
): boolean {
  return findDuplicates(array, typeof fn === 'function' ? fn : undefined, 1).length === 0;
}
