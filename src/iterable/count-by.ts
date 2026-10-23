/**
 * Counts how many times each key appears in an iterable, using a mapper function to
 * derive the key from each item.
 * Works on any `Iterable`: arrays, `Map`s, `Set`s, generators, and custom iterators.
 * @param iterable - The iterable to count items from.
 * @param mapper - Returns the key to count for each item.
 * Receives the item and its zero-based iteration index.
 * @returns A `Map` from each key to the number of times it appeared.
 * @example
 * // Count word frequencies in an array
 * countBy(['apple', 'banana', 'apple', 'cherry'], (word) => word);
 * // Map { 'apple' => 2, 'banana' => 1, 'cherry' => 1 }
 * @example
 * // Classify numbers as even or odd
 * countBy([1, 2, 3, 4, 5], (n) => (n % 2 === 0 ? 'even' : 'odd'));
 * // Map { 'odd' => 3, 'even' => 2 }
 * @example
 * // Use the iteration index to split items into positional buckets
 * countBy(['a', 'b', 'c', 'd', 'e'], (_item, index) => (index < 3 ? 'first' : 'rest'));
 * // Map { 'first' => 3, 'rest' => 2 }
 * @example
 * // Count Map entries: a Map iterates as [key, value] pairs
 * const scores = new Map([['alice', 90], ['bob', 75], ['carol', 90]]);
 * countBy(scores, ([, score]) => (score >= 90 ? 'A' : 'B'));
 * // Map { 'A' => 2, 'B' => 1 }
 * @example
 * // Works on generators and other lazy iterables
 * function* chars() { yield 'a'; yield 'b'; yield 'a'; }
 * countBy(chars(), (char) => char);
 * // Map { 'a' => 2, 'b' => 1 }
 */
export const countBy = <T, K>(
  iterable: Iterable<T>,
  mapper: (item: T, index: number) => K,
): Map<K, number> => {
  const result = new Map<K, number>();
  let index = 0;

  for (const item of iterable) {
    const key = mapper(item, index++);
    result.set(key, (result.get(key) || 0) + 1);
  }

  return result;
};
