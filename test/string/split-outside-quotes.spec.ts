// cspell:ignore Neue
import {splitOutsideQuotes} from '../../src/string/split-outside-quotes.ts';

describe('string/splitOutsideQuotes', () => {
  it('does not split inside quotes and brackets', () => {
    expect(splitOutsideQuotes('a,"b,c",d', ',')).toStrictEqual(['a', '"b,c"', 'd']);
    expect(splitOutsideQuotes("a,'b,c',`d,e`", ',')).toStrictEqual(['a', "'b,c'", '`d,e`']);
    expect(splitOutsideQuotes('f(a,b),[c,d],{e,f}', ',')).toStrictEqual([
      'f(a,b)',
      '[c,d]',
      '{e,f}',
    ]);
    expect(splitOutsideQuotes('Arial, "Helvetica Neue", local(a, b)', ',')).toStrictEqual([
      'Arial',
      ' "Helvetica Neue"',
      ' local(a, b)',
    ]);
  });

  it('does not treat `<` and `>` as brackets by default', () => {
    expect(splitOutsideQuotes('a < b, c > d', ',')).toStrictEqual(['a < b', ' c > d']);
  });

  it('keeps empty parts and does not split on escaped separators', () => {
    expect(splitOutsideQuotes('a,,b', ',')).toStrictEqual(['a', '', 'b']);
    expect(splitOutsideQuotes(String.raw`a\,b,c`, ',')).toStrictEqual(['a,b', 'c']);
  });

  it('supports custom quotes and brackets', () => {
    expect(
      splitOutsideQuotes("a 'b c' (d e)", ' ', {quotes: ["'"], brackets: false}),
    ).toStrictEqual(['a', "'b c'", '(d', 'e)']);
    expect(splitOutsideQuotes('a,<b,c>', ',', {brackets: {'<': '>'}})).toStrictEqual([
      'a',
      '<b,c>',
    ]);
    expect(splitOutsideQuotes('a,"b,c"', ',', {quotes: false})).toStrictEqual(['a', '"b', 'c"']);
  });

  it('throws for an unclosed bracket in strict mode', () => {
    expect(splitOutsideQuotes('a,(b,c', ',')).toStrictEqual(['a', '(b,c']);
    expect(() => splitOutsideQuotes('a,(b,c', ',', {strict: true})).toThrow(SyntaxError);
  });

  it('throws for a separator that is not a single UTF-16 code unit', () => {
    expect(() => splitOutsideQuotes('a😀b', '😀')).toThrow(TypeError);
    expect(() => splitOutsideQuotes('a, b', ', ')).toThrow(TypeError);
  });

  it('accepts readonly quotes and brackets', () => {
    expect(
      splitOutsideQuotes("a,'b,c',[d,e]", ',', {
        quotes: ["'"] as const,
        brackets: {'[': ']'} as const,
      }),
    ).toStrictEqual(['a', "'b,c'", '[d,e]']);
  });
});
