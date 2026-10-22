import {findDuplicates} from '../_internal/find-duplicates.ts';

interface ArrayFindDuplicatesOptions {
  /**
   * Stops the search once this many duplicates are found.
   * Defaults to `Infinity`.
   */
  limit?: number;
}

/**
 * Finds the elements that repeat an earlier element of the array. Each repeated
 * value is reported once, as its second occurrence, in the order the repeats
 * are found. The strategy used for the equality check depends on the optional
 * second argument:
 *
 * - When omitted, items are compared using `SameValueZero` (the same semantics
 *   as `Set.prototype.has`).
 * - When a binary function `(a, b) => boolean` is passed, it is used as a
 *   custom comparator. `a` is an earlier element and `b` a later one.
 * - When a unary function `(value) => key` is passed, items are mapped through
 *   it and the resulting keys are compared.
 *
 * To only check whether there are any duplicates, use `arrayIsUnique`.
 * @param array - The array to search. Not mutated.
 * @param options - Optional search settings, passed after the mapper or comparator when there is one.
 * @param options.limit - Stops the search once this many duplicates are found. Defaults to `Infinity`.
 * @returns A new array with one element per repeated value.
 * @example
 * // Basic equality (SameValueZero)
 * arrayFindDuplicates([1, 2, 1, 3, 2, 1]);
 * // [1, 2]
 * @example
 * // With a mapper — find duplicates by a derived key
 * arrayFindDuplicates([{id: 1, v: 'a'}, {id: 2, v: 'b'}, {id: 1, v: 'c'}], (item) => item.id);
 * // [{id: 1, v: 'c'}]
 * @example
 * // With a custom comparator
 * arrayFindDuplicates(['a', 'B', 'b', 'A'], (a, b) => a.toLowerCase() === b.toLowerCase());
 * // ['b', 'A']
 * @example
 * // Stop after the first few duplicates
 * arrayFindDuplicates([1, 1, 2, 2, 3, 3], {limit: 2});
 * // [1, 2]
 */
export function arrayFindDuplicates<T>(
  array: readonly T[],
  options?: ArrayFindDuplicatesOptions,
): T[];

/**
 * Finds the elements that repeat an earlier element of the array, comparing
 * elements with a custom function. Each repeated value is reported once, as
 * its second occurrence.
 * @param array - The array to search. Not mutated.
 * @param areItemsEqual - Tells whether two elements are equal: `a` is an earlier element and `b` a later one.
 * @param options - Optional search settings.
 * @param options.limit - Stops the search once this many duplicates are found. Defaults to `Infinity`.
 * @returns A new array with one element per repeated value.
 * @example
 * arrayFindDuplicates(['a', 'B', 'b', 'A'], (a, b) => a.toLowerCase() === b.toLowerCase());
 * // ['b', 'A']
 */
export function arrayFindDuplicates<T>(
  array: readonly T[],
  areItemsEqual: (a: T, b: T) => boolean,
  options?: ArrayFindDuplicatesOptions,
): T[];

/**
 * Finds the elements that repeat an earlier element of the array, comparing
 * the keys a function maps them to. Each repeated value is reported once, as
 * its second occurrence.
 * @param array - The array to search. Not mutated.
 * @param mapper - Maps an element to the key to compare.
 * @param options - Optional search settings.
 * @param options.limit - Stops the search once this many duplicates are found. Defaults to `Infinity`.
 * @returns A new array with one element per repeated value.
 * @example
 * arrayFindDuplicates([{id: 1, v: 'a'}, {id: 2, v: 'b'}, {id: 1, v: 'c'}], (item) => item.id);
 * // [{id: 1, v: 'c'}]
 */
export function arrayFindDuplicates<T>(
  array: readonly T[],
  mapper: (value: T) => unknown,
  options?: ArrayFindDuplicatesOptions,
): T[];
export function arrayFindDuplicates<T>(
  array: readonly T[],
  fnOrOptions?: ((value: T) => unknown) | ((a: T, b: T) => boolean) | ArrayFindDuplicatesOptions,
  options?: ArrayFindDuplicatesOptions,
): T[] {
  const isFn = typeof fnOrOptions === 'function';
  const {limit = Number.POSITIVE_INFINITY} = (isFn ? options : fnOrOptions) || {};

  return findDuplicates(array, isFn ? fnOrOptions : undefined, limit);
}
