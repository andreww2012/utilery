// cspell:ignore Neue
import splitString from 'split-string';

const DEFAULT_BRACKETS: Readonly<Record<string, string>> = {
  '(': ')',
  '[': ']',
  '{': '}',
};

/** Options of `splitOutsideQuotes` */
export interface SplitOutsideQuotesOptions {
  /**
   * Quote characters to respect, or `false` for none. Quotes are kept in the
   * result. Defaults to `true`: `"`, `'` and `` ` ``
   */
  quotes?: readonly string[] | boolean;

  /**
   * Opening and closing brackets to respect (`{'(': ')'}`), or `false` for none.
   * Defaults to `true`: `()`, `[]` and `{}`
   */
  brackets?: Readonly<Record<string, string>> | boolean;

  /**
   * Throws a `SyntaxError` for an unclosed bracket instead of splitting inside it. Defaults to `false`
   */
  strict?: boolean;
}

/**
 * Splits a string by a separator character, except where it appears inside
 * quotes or brackets, like the commas in `'a, "b, c", fn(d, e)'`. Parts are not
 * trimmed, and empty parts are kept.
 *
 * A separator preceded by a backslash is not split on, and the backslash is
 * removed (`'a\\,b'` gives `['a,b']`). An unclosed quote is treated as a
 * plain character.
 * @param text - The string to split.
 * @param separator - A single separator character: one UTF-16 code unit, so not an emoji.
 * @param options - `quotes` and `brackets` to respect (all common ones by default); `strict`: throw on an unclosed bracket.
 * @returns The parts of the string.
 * @throws {TypeError} If `separator` is not a single UTF-16 code unit.
 * @example
 * splitOutsideQuotes('a,"b,c",d', ',');
 * // ['a', '"b,c"', 'd']
 * splitOutsideQuotes('Arial, "Helvetica Neue", local(a, b)', ',');
 * // ['Arial', ' "Helvetica Neue"', ' local(a, b)']
 * @example
 * // Dotted paths with quoted keys
 * splitOutsideQuotes('a."b.c".d', '.');
 * // ['a', '"b.c"', 'd']
 * @example
 * // Only some quotes and brackets
 * splitOutsideQuotes("a 'b c' (d e)", ' ', {quotes: ["'"], brackets: false});
 * // ['a', "'b c'", '(d', 'e)']
 */
export const splitOutsideQuotes = (
  text: string,
  separator: string,
  options: SplitOutsideQuotesOptions = {},
) => {
  // The package compares the separator with single UTF-16 code units, so any other never matches
  if (separator.length !== 1) {
    throw new TypeError(
      `Expected a single UTF-16 code unit as the separator, got ${JSON.stringify(separator)}`,
    );
  }

  const {quotes = true, brackets = true, strict} = options;
  // Copied, as the package only types mutable options
  return splitString(text, {
    separator,
    quotes: typeof quotes === 'boolean' ? quotes : [...quotes],
    brackets: typeof brackets === 'boolean' ? brackets && {...DEFAULT_BRACKETS} : {...brackets},
    strict,
  });
};
