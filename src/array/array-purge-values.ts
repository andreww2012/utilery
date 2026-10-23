import {pull} from 'es-toolkit/array';
import {pullAllBy, pullAllWith} from 'es-toolkit/compat';

/**
 * **Mutates** `array`, removing every element equal to one of the given
 * `values`, and returns it.
 * Elements are compared with `SameValueZero`, like `Set.prototype.has`: to
 * compare them another way, pass a comparator or a key function as the third
 * argument.
 * @param array - The array to mutate.
 * @param values - The values to remove.
 * @returns The mutated input `array`.
 * @example
 * arrayPurgeValues([1, 2, 3, 1, 2], [1, 2]);
 * // [3]
 */
export function arrayPurgeValues<T>(array: T[], values: readonly T[]): T[];

/**
 * **Mutates** `array`, removing every element equal to one of the given
 * `values`, and returns it.
 * Elements are compared with a custom function.
 * @param array - The array to mutate.
 * @param values - The values to remove.
 * @param areItemsEqual - Tells whether two elements are equal: `a` is from `array` and `b` from
 * `values`.
 * @returns The mutated input `array`.
 * @example
 * arrayPurgeValues(
 *   [{id: 1}, {id: 2}, {id: 3}],
 *   [{id: 2}],
 *   (a, b) => a.id === b.id,
 * );
 * // [{id: 1}, {id: 3}]
 */
export function arrayPurgeValues<T, U>(
  array: T[],
  values: readonly U[],
  areItemsEqual: (a: T, b: U) => boolean,
): T[];

/**
 * **Mutates** `array`, removing every element equal to one of the given
 * `values`, and returns it.
 * Elements are compared by the keys a function maps them to.
 * @param array - The array to mutate.
 * @param values - The values to remove.
 * @param mapper - Maps an element of `array` or `values` to the key to compare.
 * @returns The mutated input `array`.
 * @example
 * arrayPurgeValues(
 *   [{id: 1}, {id: 2}, {id: 3}],
 *   [{id: 2}],
 *   (item) => item.id,
 * );
 * // [{id: 1}, {id: 3}]
 */
export function arrayPurgeValues<T, U>(
  array: T[],
  values: readonly U[],
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
