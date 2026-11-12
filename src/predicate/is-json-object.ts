import {isJSONObject} from 'es-toolkit/predicate';
import type {JsonObject} from '../types/json-object.ts';

/**
 * Checks whether a value is a JSON object: a plain object (including one with a `null` prototype)
 * whose values are all JSON values (see `isJsonValue`), at any depth
 */
export const isJsonObject: {
  /**
   * Checks whether an object is a JSON object: a plain object (including one with
   * a `null` prototype) whose values are all JSON values (see `isJsonValue`), at
   * any depth.
   * The value already has the type of a JSON object, so nothing is narrowed: it
   * may still be a class instance.
   * @param value - The object to check.
   * @returns `true` if `value` is a JSON object, otherwise `false`.
   * @example
   * declare const user: {name: string};
   * if (!isJsonObject(user)) {
   *   user; // still `{name: string}`
   * }
   */
  (value: JsonObject): boolean;

  /**
   * Checks whether a value is a JSON object: a plain object (including one with
   * a `null` prototype) whose values are all JSON values (see `isJsonValue`), at
   * any depth, and narrows it to `JsonObject`.
   * When it returns `false`, a union value loses the members of JSON object
   * types, even though they may be class instances: `{name: string} | undefined`
   * becomes `undefined`.
   * @param value - The value to check.
   * @returns `true` if `value` is a JSON object, otherwise `false`.
   * @example
   * isJsonObject({name: 'Ada', tags: ['a'], address: null});
   * // true
   * isJsonObject({name: undefined});
   * // false
   * isJsonObject(new Date());
   * // false (not a plain object)
   */
  (value: unknown): value is JsonObject;
} = isJSONObject;
