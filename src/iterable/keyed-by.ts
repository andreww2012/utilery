/**
 * Indexes items of an iterable by a key derived from each item.
 * Works on any `Iterable`: arrays, `Map`s, `Set`s, generators, and custom
 * iterators.
 * When multiple items produce the same key, the last one wins.
 * @param iterable - The iterable to index.
 * @param mapper - Returns the key for each item.
 * Receives the item and its zero-based iteration index.
 * @returns A `Map` from each derived key to the item that produced it.
 * @example
 * // Index objects by a property
 * keyedBy(
 *   [{id: 1, name: 'a'}, {id: 2, name: 'b'}],
 *   (item) => item.id,
 * );
 * // Map { 1 => {id: 1, name: 'a'}, 2 => {id: 2, name: 'b'} }
 * @example
 * // Last-write-wins on duplicate keys
 * keyedBy(
 *   [{category: 'fruit', name: 'apple'}, {category: 'fruit', name: 'banana'}],
 *   (item) => item.category,
 * );
 * // Map { 'fruit' => {category: 'fruit', name: 'banana'} }
 * @example
 * // Use the iteration index as the key
 * keyedBy(['a', 'b', 'c'], (_item, index) => index);
 * // Map { 0 => 'a', 1 => 'b', 2 => 'c' }
 * @example
 * // Index Map entries by a derived key: entries iterate as [key, value] pairs
 * const scores = new Map([['alice', 90], ['bob', 75]]);
 * keyedBy(scores, ([, score]) => (score >= 90 ? 'A' : 'B'));
 * // Map { 'A' => ['alice', 90], 'B' => ['bob', 75] }
 * @example
 * // Works on generators and other lazy iterables
 * function* chars() { yield 'a'; yield 'b'; }
 * keyedBy(chars(), (char) => char.toUpperCase());
 * // Map { 'A' => 'a', 'B' => 'b' }
 */
export const keyedBy = <T, K>(
  iterable: Iterable<T>,
  mapper: (item: T, index: number) => K,
): Map<K, T> => {
  const result = new Map<K, T>();
  let index = 0;

  for (const item of iterable) {
    result.set(mapper(item, index++), item);
  }

  return result;
};
