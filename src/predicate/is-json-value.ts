import {isJSONValue} from 'es-toolkit/predicate';
import type {JsonValue} from '../types/json-value.ts';

/**
 * Checks whether a value is made only of what JSON can represent: `null`, a string, a number, a
 * boolean, or an array or a JSON object (see `isJsonObject`) of such values, at any depth
 */
export const isJsonValue: {
  /**
   * Checks whether a value is made only of what JSON can represent: `null`, a
   * string, a number, a boolean, or an array or a JSON object (see
   * `isJsonObject`) of such values, at any depth.
   * Any number counts, including `NaN` and `Infinity`, which `JSON.stringify`
   * turns into `null`.
   * The value already has the type of a JSON value, so nothing is narrowed: its
   * objects may still be class instances.
   * @param value - The value to check.
   * @returns `true` if `value` is a JSON value, otherwise `false`.
   * @example
   * declare const user: {name: string};
   * if (!isJsonValue(user)) {
   *   user; // still `{name: string}`
   * }
   */
  (value: JsonValue): boolean;

  /**
   * Checks whether a value is made only of what JSON can represent: `null`, a
   * string, a number, a boolean, or an array or a JSON object (see
   * `isJsonObject`) of such values, at any depth, and narrows it to `JsonValue`.
   * Any number counts, including `NaN` and `Infinity`, which `JSON.stringify`
   * turns into `null`.
   * When it returns `false`, a union value loses the members of JSON types, even
   * though their objects may be class instances: `{name: string} | undefined`
   * becomes `undefined`.
   * To check whether a string is valid JSON instead, use `isJson`.
   * @param value - The value to check.
   * @returns `true` if `value` is a JSON value, otherwise `false`.
   * @example
   * isJsonValue({tags: ['a', 'b'], count: 2, extra: null});
   * // true
   * isJsonValue({callback: () => {}});
   * // false
   * isJsonValue(undefined);
   * // false
   */
  (value: unknown): value is JsonValue;
} = isJSONValue;
