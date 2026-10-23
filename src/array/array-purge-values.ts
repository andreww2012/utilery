import {pull} from 'es-toolkit/array';
import {pullAllBy, pullAllWith} from 'es-toolkit/compat';

/**
 * **Mutates** `array`, removing every element equal to one of the given
 * `values`, and returns it.
 * The strategy used for the equality check depends on the optional third
 * argument:
 *
 * - When omitted, items are compared using `SameValueZero` (delegates to
 *   `pull`).
 * - When a binary function `(a, b) => boolean` is passed, it is used as a
 *   custom comparator (delegates to `pullAllWith`).
 * - When a unary function `(value) => key` is passed, both the array and the
 *   values are mapped through it and the resulting keys are compared (delegates
 *   to `pullAllBy`).
 * @param array - The array to mutate.
 * @param values - The values to remove.
 * @returns The mutated input `array`.
 * @example
 * // Basic equality (SameValueZero)
 * arrayPurgeValues([1, 2, 3, 1, 2], [1, 2]);
 * // [3]
 * @example
 * // With a mapper: compare by a derived key
 * arrayPurgeValues(
 *   [{id: 1}, {id: 2}, {id: 3}],
 *   [{id: 2}],
 *   (item) => item.id,
 * );
 * // [{id: 1}, {id: 3}]
 * @example
 * // With a custom comparator
 * arrayPurgeValues(
 *   [{id: 1}, {id: 2}, {id: 3}],
 *   [{id: 2}],
 *   (a, b) => a.id === b.id,
 * );
 * // [{id: 1}, {id: 3}]
 */
export function arrayPurgeValues<T>(array: T[], values: readonly T[]): T[];
export function arrayPurgeValues<T, U>(
  array: T[],
  values: readonly U[],
  areItemsEqual: (a: T, b: U) => boolean,
): T[];
export function arrayPurgeValues<T, U>(
  array: T[],
  values: readonly U[],
  // eslint-disable-next-line ts/unified-signatures -- merging signatures results in less strict type inference for the provided function
  mapper: (value: T | U) => unknown,
): T[];
export function arrayPurgeValues<T>(
  array: T[],
  values: readonly unknown[],
  fn?: ((value: unknown) => unknown) | ((a: T, b: unknown) => boolean),
): T[] {
  if (!fn) {
    return pull(array, values);
  }

  if (fn.length === 2) {
    pullAllWith(array, values, fn as (a: T, b: unknown) => boolean);
  } else {
    pullAllBy(array, values, fn);
  }

  return array;
}
