import type {Split} from 'type-fest';

/** Options of `StringSplit` */
export interface StringSplitOptions {
  /**
   * Gives `string[]` when the string or the delimiter is not a literal, like
   * `` `foo.${string}` ``, as the result is unknown then.
   * When `false`, the literal parts are split anyway.
   * Defaults to `true`
   */
  strictLiteralChecks?: boolean;
}

/**
 * Splits a string literal type by a delimiter into a tuple type, like
 * `String.prototype.split` does at runtime.
 * The type-level counterpart of `stringSplit`.
 * @example
 * type A = StringSplit<'foo,bar,baz', ','>;
 * //=> ['foo', 'bar', 'baz']
 * type B = StringSplit<`foo.${string}.bar`, '.'>;
 * //=> string[]
 * type C = StringSplit<`foo.${string}.bar`, '.', {strictLiteralChecks: false}>;
 * //=> ['foo', string, 'bar']
 */
export type StringSplit<
  S extends string,
  Delimiter extends string,
  // eslint-disable-next-line ts/no-empty-object-type -- no options, so that the defaults apply
  Options extends StringSplitOptions = {},
> = Split<S, Delimiter, Options>;
