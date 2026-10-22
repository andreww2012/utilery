const DEFAULT_QUOTES = ['"', "'", '`'] as const;

/**
 * Removes one pair of matching quotes around a string, like the ones around a
 * value in a config file or a command line argument. A string that is not
 * wrapped in the same quote on both ends is returned as is. Escaped quotes
 * inside are not unescaped.
 * @param text - The string to unquote.
 * @param quotes - The quote characters to remove (defaults to `"`, `'` and `` ` ``).
 * @returns The string without the surrounding quotes.
 * @example
 * unquote('"hello world"');
 * // 'hello world'
 * unquote("'single'");
 * // 'single'
 * @example
 * // Not wrapped in matching quotes
 * unquote('"mismatched\'');
 * // '"mismatched\''
 * unquote('plain');
 * // 'plain'
 * @example
 * // Only double quotes
 * unquote("'kept'", ['"']);
 * // "'kept'"
 */
export const unquote = (text: string, quotes: readonly string[] = DEFAULT_QUOTES) => {
  const [first] = text;
  return first != null &&
    text.length >= first.length * 2 &&
    quotes.includes(first) &&
    text.endsWith(first)
    ? text.slice(first.length, -first.length)
    : text;
};
