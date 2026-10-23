/**
 * Tests whether any element of an iterable satisfies the predicate.
 * Iteration short-circuits on the first `true`, so the iterable is consumed
 * only up to (and including) that element.
 * @param iterable - The iterable to test.
 * Consumed at most once.
 * @param predicate - Receives each value and returns whether it satisfies the
 * condition.
 * @returns `true` if at least one element matches, otherwise `false`.
 * An empty iterable always returns `false`.
 * @example
 * // Returns true on the first match
 * some([1, 2, 3], (value) => value === 2);
 * // true
 * @example
 * // Returns false when nothing matches
 * some([1, 3, 5], (value) => value % 2 === 0);
 * // false
 * @example
 * // Empty iterables always return false
 * some([], () => true);
 * // false
 * @example
 * // Works on any iterable: here, a Set
 * some(new Set([1, 2, 3]), (value) => value > 2);
 * // true
 */
// eslint-disable-next-line unicorn/consistent-boolean-name
export const some = <T>(iterable: Iterable<T>, predicate: (value: T) => boolean): boolean => {
  for (const item of iterable) {
    if (predicate(item)) {
      return true;
    }
  }

  return false;
};
