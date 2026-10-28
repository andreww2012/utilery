import stringify from 'safe-stable-stringify';

type Replacer = stringify.Replacer;

interface JsonStringifyStableOptions {
  /**
   * How to write a `bigint`: `true` writes it as a JSON number with all its
   * digits, `'string'` as a JSON string, and `false` leaves it out.
   * Defaults to `true`
   */
  bigint?: boolean | 'string';

  /**
   * What to write for a circular reference: a string is written as a JSON
   * string, without escaping, `null` writes `null`, `undefined` leaves the
   * property out (or writes `null` in an array), and `Error` or `TypeError`
   * throws a `TypeError`.
   * Defaults to `'[Circular: N]'`, where `N` is the depth of the referenced
   * ancestor, `0` being the root
   */
  circularValue?: string | null | TypeErrorConstructor | ErrorConstructor | undefined;

  /**
   * Sorts the keys of objects, so that equal objects give the same JSON: `true`
   * sorts them like `Array.prototype.sort`, and a function sorts them with that
   * comparator.
   * `false` keeps the insertion order.
   * Defaults to `true`
   */
  deterministic?: boolean | ((a: string, b: string) => number);

  /**
   * The maximum number of entries to write per object or array, at least `1`.
   * The rest are replaced by a note saying how many are left out.
   * Defaults to `Infinity`
   */
  maximumBreadth?: number;

  /**
   * The maximum nesting depth to write, at least `1`.
   * Deeper objects are written as `'[Object]'`, and arrays as `'[Array]'`.
   * Defaults to `Infinity`
   */
  maximumDepth?: number;

  /**
   * Throws for values that have no exact JSON form, like functions or `NaN`,
   * instead of handling them like `JSON.stringify` does.
   * Circular references and bigints throw too, unless `circularValue` and
   * `bigint` are set.
   * Defaults to `false`
   */
  strict?: boolean;

  /**
   * Writes the error message in place of a value whose `toJSON` method, getter
   * or replacer throws, instead of throwing.
   * Defaults to `false`
   */
  safe?: boolean;
}

interface StringifyFunction {
  /**
   * Converts a value to JSON like `JSON.stringify`: a value that has no JSON
   * form gives `undefined`.
   * @param value - A value that has no JSON form.
   * @param replacer - Transforms the values, or lists the keys to keep, like the replacer of
   * `JSON.stringify`.
   * @param space - The indentation, like the one of `JSON.stringify`.
   * @returns `undefined`
   */
  (
    value: undefined | symbol | ((...parameters: unknown[]) => unknown),
    replacer?: Replacer,
    space?: string | number,
  ): undefined;

  /**
   * Converts a value to JSON like `JSON.stringify`, but deterministic and safe:
   *
   * - The keys of objects are sorted, so equal objects give the same JSON, which
   *   is handy for cache keys and hashes.
   * - A circular reference is written as `'[Circular: N]'`, where `N` is the
   *   depth of the referenced ancestor, `0` being the root, instead of throwing.
   * - A `bigint` is written as a JSON number with all its digits, instead of
   *   throwing.
   *
   * `jsonStringifyStable.configure` creates a function with other options.
   * @param value - The value to convert.
   * @param replacer - Transforms the values, or lists the keys to keep, like the replacer of
   * `JSON.stringify`.
   * @param space - The indentation, like the one of `JSON.stringify`.
   * @returns The JSON.
   * @throws {Error} With the `strict` option, when the value has no exact JSON form.
   * @throws {TypeError} When the value has a circular reference and the `circularValue` option is
   * `Error` or `TypeError`.
   * @example
   * jsonStringifyStable({b: 1, a: {d: 2, c: 3}});
   * // '{"a":{"c":3,"d":2},"b":1}'
   * @example
   * const value = {name: 'root', self: {}};
   * value.self = value;
   * jsonStringifyStable(value);
   * // '{"name":"root","self":"[Circular: 0]"}'
   * @example
   * jsonStringifyStable({id: 12345678901234567890n});
   * // '{"id":12345678901234567890}'
   */
  (
    value: string | number | unknown[] | null | boolean | object,
    replacer?: Replacer,
    space?: string | number,
  ): string;

  /**
   * Converts a value to JSON like `JSON.stringify`, but deterministic and safe:
   *
   * - The keys of objects are sorted, so equal objects give the same JSON, which
   *   is handy for cache keys and hashes.
   * - A circular reference is written as `'[Circular: N]'`, where `N` is the
   *   depth of the referenced ancestor, `0` being the root, instead of throwing.
   * - A `bigint` is written as a JSON number with all its digits, instead of
   *   throwing.
   *
   * `jsonStringifyStable.configure` creates a function with other options.
   * @param value - The value to convert.
   * @param replacer - Transforms the values, or lists the keys to keep, like the replacer of
   * `JSON.stringify`.
   * @param space - The indentation, like the one of `JSON.stringify`.
   * @returns The JSON, or `undefined` for a value that has no JSON form, like `undefined` or a
   * function.
   * @throws {Error} With the `strict` option, when the value has no exact JSON form.
   * @throws {TypeError} When the value has a circular reference and the `circularValue` option is
   * `Error` or `TypeError`.
   * @example
   * jsonStringifyStable(JSON.parse('{"b": 1, "a": 2}'));
   * // '{"a":2,"b":1}'
   */
  (
    value: unknown,
    replacer?: ((key: string, value: unknown) => unknown) | (number | string)[] | null,
    space?: string | number,
  ): string | undefined;
}

interface JsonStringifyStable extends StringifyFunction {
  /** Creates a `jsonStringifyStable` with other options */
  configure: {
    /**
     * Creates a `jsonStringifyStable` with other options.
     * @param options - The options.
     * @returns A function that converts a value to JSON with the options.
     * @throws {TypeError} When an option has a value of a wrong type.
     * @throws {RangeError} When `maximumBreadth` or `maximumDepth` is less than `1`.
     * @example
     * const stringifyCompact = jsonStringifyStable.configure({maximumDepth: 2, bigint: 'string'});
     * stringifyCompact({id: 1n, a: {b: {c: 1}}});
     * // '{"a":{"b":"[Object]"},"id":"1"}'
     */
    (options: JsonStringifyStableOptions): StringifyFunction;
  };

  /** The same function as `jsonStringifyStable` */
  stringify: JsonStringifyStable;

  /** The same function as `jsonStringifyStable` */
  default: JsonStringifyStable;
}

/**
 * Converts a value to JSON like `JSON.stringify`, but deterministic and safe: with sorted keys,
 * and without throwing on circular references and bigints
 */
export const jsonStringifyStable: JsonStringifyStable = stringify;
