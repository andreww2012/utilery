import {stripAnsi} from '../../src/string/strip-ansi.ts';

describe('string/stripAnsi', () => {
  it('removes ANSI escape codes', () => {
    expect(stripAnsi('\u{1B}[4mUnicorn\u{1B}[0m')).toBe('Unicorn');
    expect(stripAnsi('\u{1B}[31mError:\u{1B}[39m failed')).toBe('Error: failed');
    expect(stripAnsi('\u{1B}]8;;https://example.com\u{7}link\u{1B}]8;;\u{7}')).toBe('link');
  });

  it('removes sequences with any standard parameter, intermediate and final bytes', () => {
    // Cursor style, keyboard protocol flags, long parameters, inserting characters
    expect(stripAnsi('a\u{1B}[2 qb')).toBe('ab');
    expect(stripAnsi('a\u{1B}[>1ub\u{1B}[<uc')).toBe('abc');
    expect(stripAnsi('a\u{1B}[12345;67890mb')).toBe('ab');
    expect(stripAnsi('a\u{1B}[2@b')).toBe('ab');
  });

  it('removes control strings together with their content', () => {
    // Device control string, application program command, window title
    expect(stripAnsi('a\u{1B}Pq#0;2;0;0;0\u{1B}\\b')).toBe('ab');
    expect(stripAnsi('a\u{1B}_Gf=100;AAAA\u{1B}\\b')).toBe('ab');
    expect(stripAnsi('a\u{1B}]0;title\u{9C}b')).toBe('ab');
  });

  it('keeps the text after an escape code that ends with a digit', () => {
    // Saving and restoring the cursor
    expect(stripAnsi('a\u{1B}7b\u{1B}8c')).toBe('abc');
  });

  it('keeps a control string that has no end', () => {
    expect(stripAnsi('\u{1B}]0;title text')).toBe('\u{1B}]0;title text');
  });

  it('keeps plain text', () => {
    expect(stripAnsi('plain')).toBe('plain');
  });
});
