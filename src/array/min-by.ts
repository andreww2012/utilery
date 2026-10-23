import {minBy as esMinBy} from 'es-toolkit/array';

type GetValue<T> = (element: T, index: number, array: readonly T[]) => number | bigint;

/**
 * Finds the element of an array with the smallest value returned by `getValue`.
 * `getValue` can return numbers, bigints, or both.
 * When several elements share the smallest value, the first one is returned.
 * An element whose value is `NaN` is returned right away, matching `Math.min`.
 *
 * To find the smallest number or bigint itself, use `math/min`.
 * @param items - The array to search.
 * Not mutated.
 * @param getValue - Returns the value to compare for each element.
 * @returns The element with the smallest value, or `undefined` if `items` is empty
 * (a non-empty tuple never gives `undefined`).
 * @example
 * minBy([{name: 'john', age: 30}, {name: 'jane', age: 28}], (person) => person.age);
 * // {name: 'jane', age: 28}
 * @example
 * // Bigint values
 * minBy([{id: 10n}, {id: 20n}], (item) => item.id);
 * // {id: 10n}
 * @example
 * minBy([], (item: {age: number}) => item.age);
 * // undefined
 */
export function minBy<T>(items: readonly [T, ...T[]], getValue: GetValue<T>): T;
export function minBy<T>(items: readonly T[], getValue: GetValue<T>): T | undefined;
export function minBy<T>(items: readonly T[], getValue: GetValue<T>): T | undefined {
  // Relational comparison works the same for bigints, even mixed with numbers
  return esMinBy(items, getValue as (element: T, index: number, array: readonly T[]) => number);
}
