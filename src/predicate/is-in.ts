import {objectHasIn} from 'ts-extras';

/**
 * Checks whether `key` exists in `object` (including inherited properties, as
 * the `in` operator does) and acts as a type guard that narrows the **object**
 * to include that property, so it can be accessed safely afterwards.
 * The argument order mirrors the native `key in object` expression.
 * It also guards against prototype-pollution keys (`__proto__`, `constructor`).
 *
 * To narrow the **key** instead of the object (e.g. when validating a union of
 * candidate keys), use `isKeyIn`.
 * @param key - The property key to look for.
 * @param object - The object to check.
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
export const isIn = <Key extends PropertyKey, ObjectType>(
  key: Key,
  object: ObjectType,
): object is ObjectType & Record<Key, unknown> => objectHasIn(object, key);
