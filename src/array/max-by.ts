import {maxBy as esMaxBy} from 'es-toolkit/array';

type GetValue<T> = (element: T, index: number, array: readonly T[]) => number | bigint;

/**
 * Finds the element of an array with the largest value returned by `getValue`.
 * `getValue` can return numbers, bigints, or both.
 * When several elements share the largest value, the first one is returned.
 * An element whose value is `NaN` is returned right away, matching `Math.max`.
 *
 * To find the largest number or bigint itself, use `math/max`.
 * @param items - The array to search.
 * Not mutated.
 * @param getValue - Returns the value to compare for each element.
 * @returns The element with the largest value, or `undefined` if `items` is empty
 * (a non-empty tuple never gives `undefined`).
 * @example
 * maxBy([{name: 'john', age: 30}, {name: 'jane', age: 28}], (person) => person.age);
 * // {name: 'john', age: 30}
 * @example
 * // Bigint values
 * maxBy([{id: 10n}, {id: 20n}], (item) => item.id);
 * // {id: 20n}
 * @example
 * maxBy([], (item: {age: number}) => item.age);
 * // undefined
 */
export function maxBy<T>(items: readonly [T, ...T[]], getValue: GetValue<T>): T;
export function maxBy<T>(items: readonly T[], getValue: GetValue<T>): T | undefined;
export function maxBy<T>(items: readonly T[], getValue: GetValue<T>): T | undefined {
  // Relational comparison works the same for bigints, even mixed with numbers
  return esMaxBy(items, getValue as (element: T, index: number, array: readonly T[]) => number);
}
