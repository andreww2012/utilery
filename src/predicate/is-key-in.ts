import {keyIn} from 'ts-extras';

/**
 * Checks whether `key` exists in `object` (including inherited properties, as
 * the `in` operator does) and acts as a type guard that narrows the **key** to
 * those that actually exist in the object.
 * This is useful for validating a union of candidate keys: on a positive
 * result, the key is narrowed to the subset present in the object.
 * The argument order mirrors the native `key in object` expression.
 * It also guards against prototype-pollution keys (`__proto__`, `constructor`).
 *
 * To narrow the **object** instead of the key, use {@link isIn}.
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
export const isKeyIn = <Key extends PropertyKey, ObjectType extends object>(
  key: Key,
  object: ObjectType,
): key is Key & keyof ObjectType & {} => keyIn(object as Record<PropertyKey, unknown>, key);
