// cspell:ignore Привет
import {stringByteLength} from '../../src/string/string-byte-length.ts';

const encoder = new TextEncoder();

describe('string/stringByteLength', () => {
  it('counts UTF-8 bytes', () => {
    expect(stringByteLength('')).toBe(0);
    expect(stringByteLength('hello')).toBe(5);
    expect(stringByteLength('héllo')).toBe(6); // cspell:disable-line
    expect(stringByteLength('€')).toBe(3);
    expect(stringByteLength('😀')).toBe(4);
  });

  it('matches `TextEncoder`, including lone surrogates', () => {
    const inputs = ['Привет, мир 你好 😀👨‍👩‍👧', '\u{D800}', 'a\u{DC00}b', '\u{D83D}\u{D83D}'];

    inputs.forEach((input) => {
      expect(stringByteLength(input)).toBe(encoder.encode(input).length);
    });
  });
});
