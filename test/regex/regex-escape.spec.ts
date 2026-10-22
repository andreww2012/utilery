import {regexEscape} from '../../src/regex/regex-escape.ts';

describe('regex/regexEscape', () => {
  it('escapes special characters', () => {
    expect(regexEscape('a.b*c')).toBe(String.raw`a\.b\*c`);
    expect(regexEscape(String.raw`|\{}()[]^$+*?.`)).toBe(String.raw`\|\\\{\}\(\)\[\]\^\$\+\*\?\.`);
    expect(regexEscape('plain')).toBe('plain');
  });

  it('escapes `-`, so the result is safe inside a character class', () => {
    expect(regexEscape('a-z')).toBe(String.raw`a\x2dz`);
    expect(new RegExp(`[${regexEscape('a-z')}]`).test('m')).toBe(false);
    expect(new RegExp(`[${regexEscape('a-z')}]`, 'v').test('-')).toBe(true);
  });

  it('matches the string literally', () => {
    const text = 'How much $ for a 🦄? (1-2) [x]';

    expect(new RegExp(`^${regexEscape(text)}$`, 'u').test(text)).toBe(true);
  });
});
