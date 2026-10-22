// cspell:ignore nifragili nstic supercal
import wrapAnsi, {type Options} from 'wrap-ansi';

export type {Options as WrapTextOptions} from 'wrap-ansi';

/**
 * Wraps text to fit a number of terminal columns, breaking lines at spaces.
 * Widths are measured as displayed (see `getStringWidth`), and ANSI styles
 * (colors, etc.) are kept and correctly closed and reopened around the line
 * breaks. Existing line breaks are kept; tabs are expanded to spaces.
 *
 * By default, a word longer than a line is kept whole and overflows it; pass
 * `{hard: true}` to break it.
 * @param text - The text to wrap, possibly with ANSI styles.
 * @param columns - The maximum width of a line.
 * @param options - `hard`: break long words; `wordWrap`: wrap at spaces (defaults to `true`); `trim`: trim lines (defaults to `true`).
 * @returns The wrapped text, with lines separated by `\n`.
 * @example
 * wrapText('The quick brown fox jumps over the lazy dog', 15);
 * // 'The quick brown\nfox jumps over\nthe lazy dog'
 * @example
 * // Break long words
 * wrapText('supercalifragilistic', 8, {hard: true});
 * // 'supercal\nifragili\nstic'
 * @example
 * // Styles are kept on every line
 * console.log(wrapText(colors.red('a long red message'), 10));
 */
export const wrapText: (text: string, columns: number, options?: Options) => string = wrapAnsi;
