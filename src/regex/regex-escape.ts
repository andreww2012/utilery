// A leading ASCII letter or digit, ASCII punctuation except `_`, whitespace, line terminators and
// lone surrogates. No `i` flag: with `u`, it also matches the Kelvin sign and the long s
const ESCAPED_CHARACTER_REGEX =
  // eslint-disable-next-line sonar/anchor-precedence -- only the first alternative is anchored, on purpose
  /^[\dA-Za-z]|[\s!"#$%&'()*+,\-./:;<=>?@[\\\]^`{|}~\uD800-\uDFFF]/gu;
const SYNTAX_CHARACTER_REGEX = /[$()*+./?[\\\]^{|}]/;
const CONTROL_ESCAPES: ReadonlyMap<string, string> = new Map([
  ['\t', 't'],
  ['\n', 'n'],
  ['\v', 'v'],
  ['\f', 'f'],
  ['\r', 'r'],
]);

const escapeCharacter = (character: string) => {
  if (SYNTAX_CHARACTER_REGEX.test(character)) {
    return `\\${character}`;
  }

  const controlEscape = CONTROL_ESCAPES.get(character);
  if (controlEscape) {
    return `\\${controlEscape}`;
  }

  // eslint-disable-next-line unicorn/prefer-code-point -- every escaped character is one code unit, and `codePointAt` may return `undefined`
  const codeUnit = character.charCodeAt(0);
  return codeUnit > 0xff
    ? String.raw`\u${codeUnit.toString(16).padStart(4, '0')}`
    : String.raw`\x${codeUnit.toString(16).padStart(2, '0')}`;
};

/**
 * Escapes a string so that a regular expression matches it literally, in any
 * flag mode (including `u` and `v`) and in any place of a pattern: inside a
 * character class (`[...]`), after an escape like `\1` or `\0`, or in a regular
 * expression literal written to source code.
 * Works the same as the native `RegExp.escape`, which it calls when available.
 *
 * Besides the characters that have a special meaning in regular expressions
 * (`^$\.*+?()[]{}|/`), escapes the other ASCII punctuation except `_`,
 * whitespace, line terminators, lone surrogates and a leading ASCII letter or
 * digit, mostly as `\xHH` or `\uHHHH`.
 * @param text - The string to escape.
 * @returns The escaped string.
 * @example
 * regexEscape('How much $ for a 🦄?');
 * // '\\x48ow\\x20much\\x20\\$\\x20for\\x20a\\x20🦄\\?'
 * new RegExp(regexEscape('a.b*c')).test('a.b*c');
 * // true
 * @example
 * // Safe inside a character class, even with the `v` flag
 * new RegExp(`[${regexEscape('a-z')}]`).test('m');
 * // false
 * new RegExp(`[${regexEscape('a&&b')}]`, 'v').test('&');
 * // true
 * @example
 * // Safe after a backreference: the escaped `0` doesn't turn `\1` into `\10`
 * new RegExp(String.raw`(.)\1${regexEscape('0')}`).test('aa0');
 * // true
 */
export const regexEscape = (text: string) => {
  // Not every supported environment has it
  const nativeRegExp: RegExpConstructor & {escape?: (text: string) => string} = RegExp;

  return nativeRegExp.escape
    ? nativeRegExp.escape(text)
    : text.replaceAll(ESCAPED_CHARACTER_REGEX, (character) => escapeCharacter(character));
};
