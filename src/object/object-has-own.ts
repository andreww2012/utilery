import {objectHasOwn as objectHasOwnBase} from 'ts-extras';

/**
 * Checks whether an object has an own property with the given key, like `Object.hasOwn`, but as a
 * type guard: when it returns `true`, the object type gets the property, typed as `unknown`
 */
// eslint-disable-next-line unicorn/consistent-boolean-name -- named after `Object.hasOwn`
export const objectHasOwn: {
  /**
   * Checks whether an object has an own property with the given key, like
   * `Object.hasOwn`.
   * The object type already has the property, so nothing is narrowed: the
   * property may still be missing, like a key of an index signature, or be
   * inherited, like a method or a getter of a class.
   * @param object - The object to check.
   * @param key - The key of the property.
   * @returns `true` if the object has an own property with the key, otherwise `false`.
   * Always `false` for `null` and `undefined`.
   * @example
   * const counts: Record<string, number> = {};
   * declare const word: string;
   * if (!objectHasOwn(counts, word)) {
   *   counts[word] = 0; // `counts` is still a `Record<string, number>`
   * }
   */
  <ObjectType, Key extends keyof ObjectType>(
    object: ObjectType & Record<Key, unknown>,
    key: Key,
  ): boolean;

  /**
   * Checks whether an object has an own property with the given key, like
   * `Object.hasOwn`, but as a type guard: when it returns `true`, the object type
   * gets the property, typed as `unknown`.
   * Inherited properties do not count.
   * When it returns `false`, a union object loses the members whose type already
   * has the property, even though it may be inherited or missing: with
   * `{id: number} | {name: string}`, it becomes `{name: string}`.
   * To narrow the key instead, use `isKeyIn`.
   * @param object - The object to check.
   * @param key - The key of the property.
   * @returns `true` if the object has an own property with the key, otherwise `false`.
   * Always `false` for `null` and `undefined`.
   * @example
   * declare const data: object;
   * if (objectHasOwn(data, 'id')) {
   *   data.id; // unknown
   * }
   * @example
   * objectHasOwn({}, 'toString');
   * // false (inherited)
   */
  <ObjectType, Key extends PropertyKey>(
    object: ObjectType,
    key: Key,
  ): object is ObjectType & Record<Key, unknown>;
} = objectHasOwnBase;
