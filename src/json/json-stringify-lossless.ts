// cspell:ignore stringifier stringifiers
import {type NumberStringifier, stringify} from 'lossless-json';

/**
 * Converts a value to JSON like `JSON.stringify`, but without losing the precision of numbers: a
 * `bigint` or a `NumberLossless` (as returned by `jsonParseLossless`) is written with all its
 * digits, where `JSON.stringify` throws or loses them
 */
export const jsonStringifyLossless: {
  /**
   * Converts a value to JSON like `JSON.stringify`, but without losing the
   * precision of numbers: a `bigint` or a `NumberLossless` (as returned by
   * `jsonParseLossless`) is written with all its digits, where `JSON.stringify`
   * throws or loses them.
   * @param value - The value to convert.
   * @param replacer - Transforms the values, or lists the keys to keep, like the replacer of
   * `JSON.stringify`.
   * @param space - The indentation, like the one of `JSON.stringify`.
   * @param numberStringifiers - Write other number types, like the class of a decimal library:
   * each has a `test` that returns `true` for such values, and a `stringify` that returns the
   * JSON number for one, as a string.
   * @returns The JSON, or `undefined` for a value that has no JSON form, like `undefined` or a
   * function.
   * @throws {Error} When a number stringifier returns anything but a string with a JSON number.
   * @example
   * jsonStringifyLossless({id: 12345678901234567890n});
   * // '{"id":12345678901234567890}'
   * @example
   * jsonStringifyLossless(jsonParseLossless('{"price": 0.10000000000000000001}'));
   * // '{"price":0.10000000000000000001}'
   */
  (
    value: unknown,
    replacer?: ((key: string, value: unknown) => unknown) | (string | number)[] | null,
    space?: number | string,
    numberStringifiers?: NumberStringifier[],
  ): string | undefined;
} = stringify;
