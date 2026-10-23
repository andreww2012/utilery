import {isJSONObject} from 'es-toolkit/predicate';

/**
 * Checks whether a value is a JSON object: a plain object (including one with a `null` prototype)
 * whose values are all JSON values (see `isJsonValue`), at any depth.
 */
export const isJsonObject: {
  /**
   * Checks whether a value is a JSON object: a plain object (including one with
   * a `null` prototype) whose values are all JSON values (see `isJsonValue`), at
   * any depth.
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
  // eslint-disable-next-line ts/no-explicit-any -- the exact type the function narrows to
  (value: unknown): value is Record<string, any>;
} = isJSONObject;
