import {stripAnsi} from '../../src/string/strip-ansi.ts';

describe('string/stripAnsi', () => {
  it('removes ANSI escape codes', () => {
    expect(stripAnsi('\u{1B}[4mUnicorn\u{1B}[0m')).toBe('Unicorn');
    expect(stripAnsi('\u{1B}[31mError:\u{1B}[39m failed')).toBe('Error: failed');
    expect(stripAnsi('\u{1B}]8;;https://example.com\u{7}link\u{1B}]8;;\u{7}')).toBe('link');
  });

  it('keeps plain text', () => {
    expect(stripAnsi('plain')).toBe('plain');
  });
});
