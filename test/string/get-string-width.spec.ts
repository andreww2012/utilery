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

  it('counts every visible character of a cluster', () => {
    expect(getStringWidth('นำ')).toBe(2);
    expect(getStringWidth('क्ष')).toBe(2);
    expect(getStringWidth('😀\u{1F3FB}')).toBe(4);
  });

  it('counts a Hangul syllable written as separate letters as one block', () => {
    expect(getStringWidth('\u{1112}\u{1161}\u{11AB}')).toBe(2);
    expect(getStringWidth('\u{1100}\u{1100}\u{1161}')).toBe(2);
  });

  it('counts a lone surrogate as the replacement character', () => {
    expect(getStringWidth('a\u{D83D}b')).toBe(3);
  });

  it('counts a symbol that has two styles by the chosen one: 1 column as text, 2 as emoji', () => {
    expect(getStringWidth('\u{231A}')).toBe(2);
    expect(getStringWidth('\u{231A}\u{FE0E}')).toBe(1);
    expect(getStringWidth('1\u{FE0F}\u{20E3}')).toBe(2);
    expect(getStringWidth('1\u{20E3}')).toBe(1);
  });

  it('ignores ANSI escape codes unless asked to count them', () => {
    expect(getStringWidth('\u{1B}[1mbold\u{1B}[22m')).toBe(4);
    expect(getStringWidth('\u{1B}[1mbold\u{1B}[22m', {countAnsiEscapeCodes: true})).toBeGreaterThan(
      4,
    );
  });

  it('ignores whole escape codes that have intermediate bytes or content', () => {
    // Cursor style, application program command
    expect(getStringWidth('a\u{1B}[2 qb')).toBe(2);
    expect(getStringWidth('a\u{1B}_Gf=100;AAAA\u{1B}\\b')).toBe(2);
  });

  it('counts the text after an escape code that ends with a digit', () => {
    expect(getStringWidth('a\u{1B}7b\u{1B}8c')).toBe(3);
  });

  it('counts ambiguous characters as narrow by default', () => {
    expect(getStringWidth('±')).toBe(1);
    expect(getStringWidth('±', {ambiguousIsNarrow: false})).toBe(2);
  });
});
