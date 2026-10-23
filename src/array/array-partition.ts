import {partition} from '@antfu/utils';

type ArrayPredicate<T> = (value: T, index: number, array: readonly T[]) => boolean;

/**
 * Splits `array` into groups based on one or more predicates, preserving the
 * original order within each group.
 *
 * With a **single** predicate it behaves like a classic binary partition,
 * returning `[matched, unmatched]` and narrowing the element types when the
 * predicate is a type guard.
 *
 * With **multiple** predicates it performs an n-way partition: each element is
 * placed into the group of the **first** predicate it satisfies, and a final
 * group collects the elements that matched none.
 * The result therefore has one more group than the number of predicates.
 * @param array - The array to partition.
 * Not mutated.
 * @param predicate - A predicate `(value, index, array) => boolean`.
 * Pass further predicates as additional arguments to switch to an n-way
 * partition.
 * @returns For a single predicate, a `[matched, unmatched]` tuple.
 * For multiple predicates, an array of `predicates.length + 1` groups (one per
 * predicate, in order, plus a trailing group of unmatched elements).
 * @example
 * // Single predicate: binary partition into [matched, unmatched]
 * arrayPartition([1, 2, 3, 4], (value) => value % 2 === 0);
 * // [[2, 4], [1, 3]]
 * @example
 * // A type-guard predicate narrows the resulting element types
 * const mixed: (string | number)[] = ['a', 1, 'b', 2];
 * const [strings, rest] = arrayPartition(mixed, (value) => typeof value === 'string');
 * // strings: string[], rest: number[]
 * @example
 * // Multiple predicates: n-way partition, first match wins, trailing group is unmatched
 * arrayPartition([1, 2, 3, 4, 5, 6], (value) => value % 2 === 0, (value) => value % 3 === 0);
 * // [[2, 4, 6], [3], [1, 5]]
 */
export function arrayPartition<T, Matched extends T>(
  array: readonly T[],
  predicate: (value: T, index: number, array: readonly T[]) => value is Matched,
): [matched: Matched[], unmatched: Exclude<T, Matched>[]];
export function arrayPartition<T>(
  array: readonly T[],
  predicate: ArrayPredicate<T>,
): [matched: T[], unmatched: T[]];

/**
 * Splits `array` into groups based on several predicates, preserving the
 * original order within each group.
 * Each element is placed into the group of the **first** predicate it
 * satisfies, and a final group collects the elements that matched none.
 * @param array - The array to partition.
 * Not mutated.
 * @param predicate - The predicate `(value, index, array) => boolean` of the first group.
 * @param morePredicates - The predicates of the next groups, in order.
 * @returns An array of `morePredicates.length + 2` groups: one per predicate, in order, plus a
 * trailing group of unmatched elements.
 * @example
 * arrayPartition([1, 2, 3, 4, 5, 6], (value) => value % 2 === 0, (value) => value % 3 === 0);
 * // [[2, 4, 6], [3], [1, 5]]
 */
export function arrayPartition<T>(
  array: readonly T[],
  predicate: ArrayPredicate<T>,
  ...morePredicates: ArrayPredicate<T>[]
): T[][];
export function arrayPartition<T>(
  array: readonly T[],
  predicate: ArrayPredicate<T>,
  ...morePredicates: ArrayPredicate<T>[]
): T[][] {
  // `@antfu/utils` types `partition` as fixed-arity (<=6) overloads with no rest
  // signature, so the variadic call needs a cast to its real variadic shape
  return (partition as (array: readonly T[], ...predicates: ArrayPredicate<T>[]) => T[][])(
    array,
    predicate,
    ...morePredicates,
  );
}
