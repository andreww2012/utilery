// cspell:ignore mred nifragili nstic supercal
import {stripAnsi} from '../../src/string/strip-ansi.ts';
import {wrapText} from '../../src/string/wrap-text.ts';

describe('string/wrapText', () => {
  it('wraps at spaces', () => {
    expect(wrapText('The quick brown fox jumps over the lazy dog', 15)).toBe(
      'The quick brown\nfox jumps over\nthe lazy dog',
    );
  });

  it('keeps long words whole unless `hard`', () => {
    expect(wrapText('supercalifragilistic', 8)).toBe('supercalifragilistic');
    expect(wrapText('supercalifragilistic', 8, {hard: true})).toBe('supercal\nifragili\nstic');
  });

  it('keeps existing line breaks', () => {
    expect(wrapText('a b\nc d', 3)).toBe('a b\nc d');
  });

  it('keeps ANSI styles on every line', () => {
    const wrapped = wrapText('\u{1B}[31mred text here\u{1B}[39m', 8);

    expect(stripAnsi(wrapped)).toBe('red text\nhere');

    wrapped.split('\n').forEach((line) => {
      expect(line).toContain('\u{1B}[31m');
    });
  });
});
