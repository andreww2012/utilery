// cspell:ignore FEFF Привет tnvfr
import {regexEscape} from '../../src/regex/regex-escape.ts';
import {describeWithAndWithoutNative} from '../describe-with-and-without-native.ts';

const ESCAPED_AS_HEX_REGEX = /[\s!"#%&',\-:;<=>@`~]/;
const LEADING_ALPHANUMERIC_REGEX = /[\da-z]/i;
const FLAGS = ['', 'u', 'v'] as const;
const PRINTABLE_ASCII: readonly string[] = Array.from({length: 95}, (_, index) =>
  String.fromCodePoint(index + 32),
);
const ONLY_SYNTAX_CHARACTERS = {onlySyntaxCharacters: true} as const;
const LITERAL_TEXTS = [
  PRINTABLE_ASCII.join(''),
  'How much $ for a 🦄? (1-2) [x]',
  '0abc',
  'Привет, 你好!',
  '\t\n\u{2028} tabs and lines',
] as const;

// A simple implementation of the native `RegExp.escape`, for environments that don't have it
const regexEscapeStandIn = (text: string) =>
  // Like the native method, goes through code points
  Array.from(text, (character, index) => {
    if (String.raw`^$\.*+?()[]{}|/`.includes(character)) {
      return `\\${character}`;
    }

    const controlEscapeIndex = '\t\n\v\f\r'.indexOf(character);
    if (controlEscapeIndex !== -1) {
      return `\\${'tnvfr'[controlEscapeIndex]}`;
    }

    const codePoint = character.codePointAt(0) || 0;
    const isLoneSurrogate = codePoint >= 0xd8_00 && codePoint <= 0xdf_ff;
    if (
      isLoneSurrogate ||
      ESCAPED_AS_HEX_REGEX.test(character) ||
      (index === 0 && LEADING_ALPHANUMERIC_REGEX.test(character))
    ) {
      const hex = codePoint.toString(16);
      return codePoint > 0xff
        ? String.raw`\u${hex.padStart(4, '0')}`
        : String.raw`\x${hex.padStart(2, '0')}`;
    }

    return character;
  }).join('');

describe('regex/regexEscape', () => {
  describeWithAndWithoutNative(RegExp, 'escape', regexEscapeStandIn, () => {
    it('escapes syntax characters with a backslash', () => {
      expect(regexEscape(String.raw`_^$\.*+?()[]{}|/`)).toBe(
        String.raw`_\^\$\\\.\*\+\?\(\)\[\]\{\}\|\/`,
      );
    });

    it('escapes the other ASCII punctuation except `_` as `\\xHH`', () => {
      expect(regexEscape(`_,-=<>#&!%:;@~'\`"_`)).toBe(
        String.raw`_\x2c\x2d\x3d\x3c\x3e\x23\x26\x21\x25\x3a\x3b\x40\x7e\x27\x60\x22_`,
      );
    });

    it('escapes whitespace and line terminators', () => {
      // eslint-disable-next-line un/no-multiple-consecutive-spaces -- different spaces are the point
      expect(regexEscape('_\t\n\v\f\r \u{A0}\u{2028}\u{2029}\u{3000}\u{FEFF}')).toBe(
        String.raw`_\t\n\v\f\r\x20\xa0\u2028\u2029\u3000\ufeff`,
      );
    });

    it('escapes only a leading ASCII letter or digit', () => {
      expect(regexEscape('abc')).toBe(String.raw`\x61bc`);
      expect(regexEscape('1a')).toBe(String.raw`\x31a`);
      expect(regexEscape('_a')).toBe('_a');
      expect(regexEscape('Жa')).toBe('Жa');
      expect(regexEscape('你好')).toBe('你好');
      // The Kelvin sign and the long s, which some case-insensitive patterns treat as `K` and `s`
      expect(regexEscape('\u{212A}\u{17F}')).toBe('\u{212A}\u{17F}');
      expect(regexEscape('')).toBe('');
    });

    it('escapes lone surrogates but keeps surrogate pairs', () => {
      expect(regexEscape('_\u{D83D}')).toBe(String.raw`_\ud83d`);
      expect(regexEscape('_\u{DE00}\u{D83D}')).toBe(String.raw`_\ude00\ud83d`);
      expect(regexEscape('😀🦄')).toBe('😀🦄');
    });

    it('matches the string literally', () => {
      FLAGS.forEach((flags) => {
        LITERAL_TEXTS.forEach((text) => {
          expect(new RegExp(`^${regexEscape(text)}$`, flags).test(text)).toBe(true);
        });
      });
    });

    it('is safe inside a character class, even with the `v` flag', () => {
      FLAGS.forEach((flags) => {
        PRINTABLE_ASCII.forEach((character) => {
          expect(new RegExp(`^[${regexEscape(character)}]$`, flags).test(character)).toBe(true);
        });

        expect(new RegExp(`[${regexEscape('a-z')}]`, flags).test('m')).toBe(false);
      });

      ['&&', '!!', ',,', '==', '@@', '~~', 'a/b'].forEach((text) => {
        expect(new RegExp(`^[${regexEscape(text)}]$`, 'v').test(text.at(-1) || '')).toBe(true);
      });

      expect(new RegExp(`^[${regexEscape('a&&b')}]$`, 'v').test('&')).toBe(true);
    });

    it('is safe right after a backreference or `\\0`', () => {
      expect(new RegExp(String.raw`^(.)\1${regexEscape('0')}$`).test('aa0')).toBe(true);
      expect(new RegExp(String.raw`^(.)\1${regexEscape('0')}$`, 'u').test('aa0')).toBe(true);
      expect(new RegExp(String.raw`^\0${regexEscape('1')}$`, 'u').test('\u{0}1')).toBe(true);
    });

    describe('`onlySyntaxCharacters`', () => {
      it('escapes only syntax characters, with a backslash', () => {
        expect(regexEscape(String.raw`_^$\.*+?()[]{}|/`, ONLY_SYNTAX_CHARACTERS)).toBe(
          String.raw`_\^\$\\\.\*\+\?\(\)\[\]\{\}\|\/`,
        );
        expect(regexEscape('My$Button, a-b = 1 & 2', ONLY_SYNTAX_CHARACTERS)).toBe(
          String.raw`My\$Button, a-b = 1 & 2`,
        );
        expect(regexEscape('Привет, 你好! 😀\t\n\u{D83D}', ONLY_SYNTAX_CHARACTERS)).toBe(
          'Привет, 你好! 😀\t\n\u{D83D}',
        );
        expect(regexEscape('', ONLY_SYNTAX_CHARACTERS)).toBe('');
      });

      it('escapes like `RegExp.escape` when `false`', () => {
        expect(regexEscape('abc', {onlySyntaxCharacters: false})).toBe(String.raw`\x61bc`);
      });

      it('matches the string literally outside of character classes', () => {
        FLAGS.forEach((flags) => {
          LITERAL_TEXTS.forEach((text) => {
            expect(
              new RegExp(`^${regexEscape(text, ONLY_SYNTAX_CHARACTERS)}$`, flags).test(text),
            ).toBe(true);
          });
        });
      });
    });
  });
});
