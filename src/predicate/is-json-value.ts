import {isJSONValue} from 'es-toolkit/predicate';

/**
 * Checks whether a value is made only of what JSON can represent: `null`, a string, a number, a
 * boolean, or an array or a JSON object (see `isJsonObject`) of such values, at any depth.
 */
export const isJsonValue: {
  /**
   * Checks whether a value is made only of what JSON can represent: `null`, a
   * string, a number, a boolean, or an array or a JSON object (see
   * `isJsonObject`) of such values, at any depth.
   * Any number counts, including `NaN` and `Infinity`, which `JSON.stringify`
   * turns into `null`.
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
  (
    value: unknown,
    // eslint-disable-next-line ts/no-explicit-any -- the exact type the function narrows to
  ): value is Record<string, any> | any[] | string | number | boolean | null;
} = isJSONValue;
