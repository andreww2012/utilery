import {isJSONArray} from 'es-toolkit/predicate';

/** Checks whether a value is an array of JSON values (see `isJsonValue`), at any depth */
export const isJsonArray: {
  /**
   * Checks whether a value is an array of JSON values (see `isJsonValue`), at any
   * depth.
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
  // eslint-disable-next-line ts/no-explicit-any -- the exact type the function narrows to
  (value: unknown): value is any[];
} = isJSONArray;
