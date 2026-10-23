/**
 * Finds the first element of an iterable that satisfies the predicate.
 * Iteration short-circuits on the first match, so the iterable is consumed only
 * up to (and including) that element.
 * Supports an optional type-guard predicate to narrow the return type.
 * @param iterable - The iterable to search.
 * Consumed at most once.
 * @param predicate - Receives each value and returns whether it matches.
 * @returns The first matching value, or `undefined` if nothing matched.
 * @example
 * // Returns the first matching element
 * find([1, 2, 3, 4], (value) => value > 2);
 * // 3
 * @example
 * // Returns undefined when nothing matches
 * find([1, 2, 3], (value) => value > 10);
 * // undefined
 * @example
 * // Works on any iterable: here, a Set
 * find(new Set(['a', 'bb', 'ccc']), (value) => value.length === 2);
 * // 'bb'
 * @example
 * // Type guard predicates narrow the return type
 * const items: (string | number)[] = ['a', 1, 'b'];
 * find(items, (value): value is number => typeof value === 'number');
 * // 1 (typed as `number | undefined`)
 */
export function find<T, U extends T>(
  iterable: Iterable<T>,
  predicate: (value: T) => value is U,
): U | undefined;
export function find<T>(iterable: Iterable<T>, predicate: (value: T) => boolean): T | undefined;
export function find<T>(iterable: Iterable<T>, predicate: (value: T) => boolean): T | undefined {
  for (const item of iterable) {
    if (predicate(item)) {
      return item;
    }
  }

  return undefined;
}
