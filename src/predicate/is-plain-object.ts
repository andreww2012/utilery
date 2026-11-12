import {isPlainObject as isPlainObjectBase} from 'es-toolkit/predicate';

/**
 * Checks whether a value is a plain object: one created by an object literal, `new Object()` or
 * `Object.create(null)`, also in another realm
 */
export const isPlainObject: {
  /**
   * Checks whether a value is a plain object: one created by an object literal,
   * `new Object()` or `Object.create(null)`, also in another realm (like a `vm`
   * context or an iframe).
   * Arrays, class instances and built-in objects like `Date` are not plain.
   * The value already has the type of a plain object, so nothing is narrowed:
   * a value of an object type may still be a class instance.
   * @param value - The value to check.
   * @returns `true` if the value is a plain object, otherwise `false`.
   * @example
   * declare const options: {timeoutMs: number};
   * if (!isPlainObject(options)) {
   *   options; // still `{timeoutMs: number}`
   * }
   */
  (value: Record<PropertyKey, unknown>): boolean;

  /**
   * Checks whether a value is a plain object: one created by an object literal,
   * `new Object()` or `Object.create(null)`, also in another realm (like a `vm`
   * context or an iframe), and narrows it to `Record<PropertyKey, unknown>`, as a
   * plain object may have symbol keys.
   * Arrays, class instances and built-in objects like `Date` are not plain.
   * When it returns `false`, a union value loses the members of object types like
   * `{a: number}` or `Record<string, number>`, even though such a value may be a
   * class instance.
   * @param value - The value to check.
   * @returns `true` if the value is a plain object, otherwise `false`.
   * @example
   * isPlainObject({a: 1});
   * // true
   * isPlainObject(Object.create(null));
   * // true
   * isPlainObject([]);
   * // false
   * isPlainObject(new Date());
   * // false
   * @example
   * declare const tag: unique symbol;
   * declare const value: unknown;
   * if (isPlainObject(value)) {
   *   value[tag]; // unknown
   * }
   */
  (value: unknown): value is Record<PropertyKey, unknown>;
} = isPlainObjectBase;
