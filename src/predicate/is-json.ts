import {isJSON} from 'es-toolkit/predicate';

/** Checks whether a value is a string that `JSON.parse` can parse */
export const isJson: {
  /**
   * Checks whether a value is a string that `JSON.parse` can parse.
   * Any JSON value counts, including a bare string, number, boolean or `null`,
   * like `'42'` or `'null'`.
   * To check whether a value can be converted to JSON instead, use `isJsonValue`.
   * @param value - The value to check.
   * @returns `true` if `value` is a valid JSON string, otherwise `false`.
   * @example
   * isJson('{"name": "Ada"}');
   * // true
   * isJson('true');
   * // true
   * isJson('{name: "Ada"}');
   * // false
   * isJson({name: 'Ada'});
   * // false (not a string)
   */
  (value: unknown): value is string;
} = isJSON;
