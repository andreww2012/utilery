// cspell:ignore mbold
import stringWidth, {type Options} from 'string-width';

/**
 * Gets the number of terminal columns a string takes when displayed, unlike its
 * `length`: wide characters (Chinese, Japanese, Korean, most emoji) take 2
 * columns, combining marks and zero-width characters take none, and ANSI escape
 * codes are ignored.
 * Useful to align text in a terminal.
 *
 * Characters whose width depends on the context (ambiguous width, like `±` or
 * some Cyrillic letters in East Asian fonts) count as 1 column; pass
 * `{ambiguousIsNarrow: false}` to count them as 2.
 * Pass `{countAnsiEscapeCodes: true}` to count escape codes as visible text.
 * @param text - The string to measure.
 * @param options - Options.
 * @param options.ambiguousIsNarrow - Count ambiguous-width characters as 1 column (defaults to
 * `true`).
 * @param options.countAnsiEscapeCodes - Count ANSI escape codes as visible text (defaults to
 * `false`).
 * @returns The number of columns.
 * @example
 * getStringWidth('abc');
 * // 3
 * getStringWidth('古池');
 * // 4
 * getStringWidth('👨‍👩‍👧');
 * // 2
 * getStringWidth('\u001B[1mbold\u001B[22m');
 * // 4
 */
export const getStringWidth: (text: string, options?: Options) => number = stringWidth;
