import {objectHasOwn as objectHasOwnBase} from 'ts-extras';

/**
 * Checks whether an object has an own property with the given key, like `Object.hasOwn`, but as a
 * type guard: when it returns `true`, the object type gets the property, typed as `unknown`.
 */
// eslint-disable-next-line unicorn/consistent-boolean-name
export const objectHasOwn: {
  /**
   * Checks whether an object has an own property with the given key, like
   * `Object.hasOwn`, but as a type guard: when it returns `true`, the object type
   * gets the property, typed as `unknown`.
   * Inherited properties do not count.
   * To narrow the key instead, use `isKeyIn`.
   * @param object - The object to check.
   * @param key - The key of the property.
   * @returns `true` if the object has an own property with the key, otherwise `false`.
   * @throws {TypeError} When `object` is `null` or `undefined`.
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
