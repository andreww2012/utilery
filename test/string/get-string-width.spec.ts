// cspell:ignore mbold
import {getStringWidth} from '../../src/string/get-string-width.ts';

describe('string/getStringWidth', () => {
  it('counts terminal columns', () => {
    expect(getStringWidth('abc')).toBe(3);
    expect(getStringWidth('古池')).toBe(4);
    expect(getStringWidth('👨‍👩‍👧')).toBe(2);
    expect(getStringWidth('e\u{301}')).toBe(1);
    expect(getStringWidth('')).toBe(0);
  });

  it('ignores ANSI escape codes unless asked to count them', () => {
    expect(getStringWidth('\u{1B}[1mbold\u{1B}[22m')).toBe(4);
    expect(getStringWidth('\u{1B}[1mbold\u{1B}[22m', {countAnsiEscapeCodes: true})).toBeGreaterThan(
      4,
    );
  });

  it('counts ambiguous characters as narrow by default', () => {
    expect(getStringWidth('±')).toBe(1);
    expect(getStringWidth('±', {ambiguousIsNarrow: false})).toBe(2);
  });
});
