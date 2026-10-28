import {LosslessNumber, type ParseOptions, parse} from 'lossless-json';

/**
 * A number from JSON, stored as its original text so that no digits are lost.
 * `jsonParseLossless` returns one for every number, and `jsonStringifyLossless`
 * writes it back as is.
 * Use `.valueOf()` to get a `number`, or a `bigint` for a big integer.
 * It throws an `Error` for a number that would become `Infinity` or `0` as a `number`, like
 * `'1e500'`.
 * @example
 * const value = new NumberLossless('12345678901234567890');
 * value.toString();
 * // '12345678901234567890'
 * value.valueOf();
 * // 12345678901234567890n
 */
export const NumberLossless: {
  /**
   * Creates a number from JSON from its text, keeping every digit.
   * @param value - The number as text, like `'12345678901234567890'`.
   * @throws {Error} When `value` is not a valid JSON number
   */
  new (value: string): NumberLossless;
  readonly prototype: NumberLossless;
} = LosslessNumber;
// eslint-disable-next-line ts/no-redeclare -- merged with the constant above so the name works both with `instanceof` and as a type
export type NumberLossless = LosslessNumber;

/** Parses JSON like `JSON.parse`, but without losing the precision of numbers */
export const jsonParseLossless: {
  /**
   * Parses JSON like `JSON.parse`, but without losing the precision of numbers:
   * by default every number becomes a `NumberLossless`, which keeps its original
   * text, so big integers and long decimals survive.
   * A key repeated with a different value is an error, unlike with `JSON.parse`.
   * @param text - The JSON to parse.
   * @param reviver - Transforms the parsed values, like the reviver of `JSON.parse`.
   * @param options - Options, or a function that converts the text of each number to a value.
   * @param options.parseNumber - Converts the text of each number to a value.
   * Defaults to creating a `NumberLossless`.
   * @param options.onDuplicateKey - Called for a key repeated with a different value, with the
   * key, its position, and the old and new values.
   * Returns the value to keep, or `undefined` to keep the old one.
   * Defaults to throwing a `SyntaxError`.
   * @returns The parsed value.
   * @throws {SyntaxError} When `text` is not valid JSON, or has a key repeated with a different
   * value.
   * @example
   * const data = jsonParseLossless('{"id": 12345678901234567890}') as {id: NumberLossless};
   * data.id.toString();
   * // '12345678901234567890' (`JSON.parse` gives 12345678901234567000)
   * @example
   * // Get regular numbers, and bigints for big integers (throws for numbers like `1e500`)
   * const toNumber = (text: string) => new NumberLossless(text).valueOf();
   * jsonParseLossless('[1.5, 12345678901234567890]', null, toNumber);
   * // [1.5, 12345678901234567890n]
   */
  (
    text: string,
    reviver?: ((key: string, value: unknown) => unknown) | null,
    options?: ParseOptions | ((text: string) => unknown),
  ): unknown;
} = parse;
