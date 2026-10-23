import escapeStringRegexp from 'escape-string-regexp';

/**
 * Escapes the characters that have a special meaning in regular expressions
 * (`|\{}()[]^$+*?.` and `-`), so that a string can be matched literally,
 * including inside a character class (`[...]`) and in patterns with the `u`
 * or `v` flag.
 * @param text - The string to escape.
 * @returns The escaped string.
 * @example
 * regexEscape('How much $ for a 🦄?');
 * // 'How much \\$ for a 🦄\\?'
 * new RegExp(regexEscape('a.b*c')).test('a.b*c');
 * // true
 * @example
 * // Safe inside a character class
 * new RegExp(`[${regexEscape('a-z')}]`).test('m');
 * // false
 */
// eslint-disable-next-line unicorn/prefer-export-from -- re-declared to attach rewritten JSDoc; an `export ... from` would inherit the upstream docs
export const regexEscape = escapeStringRegexp;
