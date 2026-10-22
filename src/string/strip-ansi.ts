import stripAnsiBase from 'strip-ansi';

/**
 * Removes ANSI escape codes (colors, styles, cursor movement, terminal links,
 * etc.) from a string, leaving the plain text. Useful to measure, compare or
 * log text styled for a terminal. Unlike Node's
 * `util.stripVTControlCharacters`, works in any environment.
 * @param text - The text with ANSI escape codes.
 * @returns The text without ANSI escape codes.
 * @example
 * stripAnsi('\u001B[4mUnicorn\u001B[0m');
 * // 'Unicorn'
 * stripAnsi(colors.red('Error:') + ' failed');
 * // 'Error: failed'
 */
export const stripAnsi: (text: string) => string = stripAnsiBase;
