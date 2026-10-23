/**
 * Tests whether every element of an iterable satisfies the predicate.
 * Iteration short-circuits on the first `false`, so the iterable is consumed
 * only up to (and including) that element.
 * @param iterable - The iterable to test.
 * Consumed at most once.
 * @param predicate - Receives each value and returns whether it satisfies the
 * condition.
 * @returns `true` if every element matches (including for an empty iterable),
 * otherwise `false`.
 * @example
 * // Returns true when every element matches
 * every([2, 4, 6], (value) => value % 2 === 0);
 * // true
 * @example
 * // Short-circuits at the first non-matching element
 * every([2, 3, 4], (value) => value % 2 === 0);
 * // false
 * @example
 * // Empty iterables vacuously match
 * every([], () => false);
 * // true
 * @example
 * // Works on any iterable: here, a generator
 * function* counts() { yield 1; yield 2; yield 3; }
 * every(counts(), (value) => value > 0);
 * // true
 */
// eslint-disable-next-line unicorn/consistent-boolean-name
export const every = <T>(iterable: Iterable<T>, predicate: (value: T) => boolean): boolean => {
  for (const item of iterable) {
    if (!predicate(item)) {
      return false;
    }
  }

  return true;
};
