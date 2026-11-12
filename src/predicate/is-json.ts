import {isJSON} from 'es-toolkit/predicate';

/** Checks whether a value is a string that `JSON.parse` can parse */
export const isJson: {
  /**
   * Checks whether a string can be parsed by `JSON.parse`.
   * Any JSON value counts, including a bare string, number, boolean or `null`,
   * like `'42'` or `'null'`.
   * The value is already a string, so nothing is narrowed.
   * To check whether a value can be converted to JSON instead, use `isJsonValue`.
   * @param value - The string to check.
   * @returns `true` if `value` is a valid JSON string, otherwise `false`.
   * @example
   * isJson('{"name": "Ada"}');
   * // true
   * isJson('true');
   * // true
   * isJson('{name: "Ada"}');
   * // false
   */
  (value: string): boolean;

  /**
   * Checks whether a value is a string that `JSON.parse` can parse, and narrows
   * it to `string`.
   * Any JSON value counts, including a bare string, number, boolean or `null`,
   * like `'42'` or `'null'`.
   * When it returns `false`, a union value loses its `string` member, even though
   * the string may not be JSON: `string | undefined` becomes `undefined`.
   * To check whether a value can be converted to JSON instead, use `isJsonValue`.
   * @param value - The value to check.
   * @returns `true` if `value` is a valid JSON string, otherwise `false`.
   * @example
   * isJson('{"name": "Ada"}');
   * // true
   * isJson({name: 'Ada'});
   * // false (not a string)
   */
  (value: unknown): value is string;
} = isJSON;
