import {isJSONArray} from 'es-toolkit/predicate';
import type {JsonArray} from '../types/json-array.ts';

/** Checks whether a value is an array of JSON values (see `isJsonValue`), at any depth */
export const isJsonArray: {
  /**
   * Checks whether an array holds only JSON values (see `isJsonValue`), at any
   * depth.
   * The value already has the type of a JSON array, so nothing is narrowed: its
   * objects may still be class instances.
   * @param value - The array to check.
   * @returns `true` if `value` is an array of JSON values, otherwise `false`.
   * @example
   * declare const rows: {id: number}[];
   * if (!isJsonArray(rows)) {
   *   rows; // still `{id: number}[]`
   * }
   */
  (value: JsonArray): boolean;

  /**
   * Checks whether a value is an array of JSON values (see `isJsonValue`), at any
   * depth, and narrows it to `JsonArray`.
   * When it returns `false`, a union value loses the members of JSON array types,
   * even though their objects may be class instances: `{id: number}[] | undefined`
   * becomes `undefined`.
   * @param value - The value to check.
   * @returns `true` if `value` is an array of JSON values, otherwise `false`.
   * @example
   * isJsonArray([1, 'a', null, {b: true}]);
   * // true
   * isJsonArray([1, undefined]);
   * // false
   * isJsonArray('[1, 2]');
   * // false (not an array)
   */
  (value: unknown): value is JsonArray;
} = isJSONArray;
