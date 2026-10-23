import {type FilteredArray, type NonRefinedFilteredArray, filter} from 'remeda';

/**
 * Returns a new array of the elements of `array` that pass `predicate`, just
 * like `Array.prototype.filter`, but **tuple-aware** in the return type: when
 * the input is a tuple and `predicate` is (or is inferred as) a type guard, the
 * result is the refined *tuple* of surviving elements rather than a widened
 * `T[]`.
 * Since TypeScript 5.5 a predicate like `(value) => value !== 2` is inferred as
 * a guard, so `arrayFilter([1, 2, 3], (value) => value !== 2)` is typed
 * `[1, 3]`, where native `.filter` only yields `(1 | 3)[]`.
 *
 * Regular arrays still narrow to the guarded element type (e.g. `number[]`), and
 * a non-narrowing boolean predicate yields the element array type.
 * This tuple-level refinement is the reason this util exists.
 * @param array - The array (or tuple) to filter.
 * Not mutated.
 * @param predicate - Keeps each element it returns `true` for; a type guard refines the result
 * type.
 * @returns A new array (or refined tuple) of the elements that passed.
 * @example
 * // Tuple input + inferred guard: the result is the refined tuple `[1, 3]`
 * arrayFilter([1, 2, 3], (value) => value !== 2);
 * // [1, 3]
 * @example
 * // Regular array: narrows to the guarded element type (`number[]`)
 * arrayFilter([1, 'a', 2], (value): value is number => typeof value === 'number');
 * // [1, 2]
 */
export function arrayFilter<T extends readonly unknown[], Condition extends T[number]>(
  array: T,
  predicate: (value: T[number], index: number, array: T) => value is Condition,
): FilteredArray<T, Condition>;
export function arrayFilter<T extends readonly unknown[], IsIncluded extends boolean>(
  array: T,
  predicate: (value: T[number], index: number, array: T) => IsIncluded,
): NonRefinedFilteredArray<T, IsIncluded>;
export function arrayFilter<T extends readonly unknown[]>(
  array: T,
  predicate: (value: T[number], index: number, array: T) => boolean,
): T[number][] {
  return filter(array, predicate);
}
