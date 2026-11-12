import {keyIn} from 'ts-extras';

// The check always fails for `__proto__` and `constructor`
type KeyInObject<Key, ObjectType> = Exclude<Key & keyof ObjectType, '__proto__' | 'constructor'>;

/**
 * Checks whether `key` exists in `object`, including inherited properties, as the `in` operator
 * does, and acts as a type guard that narrows the **key** to those that exist in the object
 */
export const isKeyIn: {
  /**
   * Checks whether `key` exists in `object`, including inherited properties, as
   * the `in` operator does.
   * The key type can't be narrowed, so nothing is narrowed: either every key of
   * its type is a key of the object type, which may still be missing (like an
   * optional property or a key of an index signature), or none of them is.
   * The argument order mirrors the native `key in object` expression.
   * It always returns `false` for `__proto__` and `constructor`, the keys used for
   * prototype pollution.
   * @param key - The property key to look for.
   * @param object - The object to check.
   * @returns `true` if `key` is in `object` (own or inherited), otherwise `false`.
   * @example
   * const counts: Record<string, number> = {};
   * declare const word: string;
   * if (!isKeyIn(word, counts)) {
   *   counts[word] = 0; // `word` is still a `string`
   * }
   */
  <Key extends PropertyKey, ObjectType extends object>(
    key: [Key] extends [keyof ObjectType]
      ? Key
      : [KeyInObject<Key, ObjectType>] extends [never]
        ? Key
        : never,
    object: ObjectType,
  ): boolean;

  /**
   * Checks whether `key` exists in `object`, including inherited properties, as
   * the `in` operator does, and acts as a type guard that narrows the **key** to
   * those that exist in the object.
   * This is useful for validating a union of candidate keys: on a positive
   * result, the key is narrowed to the subset present in the object.
   * The narrowed type only has the keys that the object type lists, while
   * inherited keys like `toString` pass the check too.
   * When it returns `false`, the key loses the keys of the object type, even
   * though optional ones may be missing: with `'a' | 'b' | 'c'` and
   * `{a: number; b?: number}`, it becomes `'c'`.
   * The argument order mirrors the native `key in object` expression.
   * It always returns `false` for `__proto__` and `constructor`, the keys used for
   * prototype pollution.
   *
   * To narrow the **object** instead of the key, use `isIn`.
   * @param key - The property key (often a union of candidates) to look for.
   * @param object - The object to check.
   * @returns `true` if `key` is in `object` (own or inherited); narrows `key` to
   * the keys that exist in `object`.
   * @example
   * // Narrows a union of candidate keys to those present in the object
   * const object = {foo: 1, bar: 2};
   * const key = 'foo' as 'foo' | 'bar' | 'baz';
   * if (isKeyIn(key, object)) {
   *   object[key]; // `key` is now `'foo' | 'bar'`
   * }
   */
  <Key extends PropertyKey, ObjectType extends object>(
    key: Key,
    object: ObjectType,
  ): key is KeyInObject<Key, ObjectType>;
} = <Key extends PropertyKey, ObjectType extends object>(
  key: Key,
  object: ObjectType,
): key is KeyInObject<Key, ObjectType> =>
  // eslint-disable-next-line un/no-type-assertion -- the upstream function only accepts records, but works with any object
  keyIn(object as Record<PropertyKey, unknown>, key);
