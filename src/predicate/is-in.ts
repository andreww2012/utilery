import {objectHasIn} from 'ts-extras';

/**
 * Checks whether `key` exists in `object`, including inherited properties, as the `in` operator
 * does, and acts as a type guard that narrows the **object** to include that property
 */
export const isIn: {
  /**
   * Checks whether `key` exists in `object`, including inherited properties, as
   * the `in` operator does.
   * The object type already has the property, so nothing is narrowed: a key of
   * an index signature may still be missing.
   * The argument order mirrors the native `key in object` expression.
   * It always returns `false` for `__proto__` and `constructor`, the keys used for
   * prototype pollution.
   * @param key - The property key to look for.
   * @param object - The object to check.
   * @returns `true` if `key` is in `object` (own or inherited), otherwise `false`.
   * @example
   * const counts: Record<string, number> = {};
   * declare const word: string;
   * if (!isIn(word, counts)) {
   *   counts[word] = 0; // `counts` is still a `Record<string, number>`
   * }
   */
  <ObjectType, Key extends keyof ObjectType>(
    key: Key,
    object: ObjectType & Record<Key, unknown>,
  ): boolean;

  /**
   * Checks whether `key` exists in `object`, including inherited properties, as
   * the `in` operator does, and acts as a type guard that narrows the **object**
   * to include that property, so it can be accessed safely afterwards.
   * The argument order mirrors the native `key in object` expression.
   * It always returns `false` for `__proto__` and `constructor`, the keys used for
   * prototype pollution.
   * When it returns `false`, a union object loses the members whose type already
   * has the key, even though a key of an index signature may be missing: with
   * `Record<string, number> | Date` and a `string` key, it becomes `Date`.
   *
   * To narrow the **key** instead of the object (e.g. when validating a union of
   * candidate keys), use `isKeyIn`.
   * @param key - The property key to look for.
   * @param object - The value to check.
   * Unlike the `in` operator, it may be a primitive: `null` and `undefined` have
   * no keys, and the others have the keys of their wrapper objects, like `length`
   * of a string.
   * @returns `true` if `key` is in `object` (own or inherited); narrows `object`
   * to additionally hold `key`.
   * @example
   * // Narrows an `unknown` value so the property can be read
   * const data: unknown = {foo: 1};
   * if (isIn('foo', data)) {
   *   data.foo; // accessible: `data` is now `Record<'foo', unknown>`
   * }
   * @example
   * // Inherited properties are found too
   * isIn('toString', {});
   * // true
   */
  <Key extends PropertyKey, ObjectType>(
    key: Key,
    object: ObjectType,
  ): object is ObjectType & Record<Key, unknown>;
} = <Key extends PropertyKey, ObjectType>(
  key: Key,
  object: ObjectType,
): object is ObjectType & Record<Key, unknown> => objectHasIn(object, key);
