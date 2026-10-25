// cspell:ignore école primaire über
import {toSentenceCase} from '../../src/string/to-sentence-case.ts';

describe('string/toSentenceCase', () => {
  it('lower-cases the words and capitalizes the first one', () => {
    expect(toSentenceCase('hello world')).toBe('Hello world');
    expect(toSentenceCase('fooBar')).toBe('Foo bar');
    expect(toSentenceCase('XMLHttpRequest')).toBe('Xml http request');
    expect(toSentenceCase('snake_case-and-kebab')).toBe('Snake case and kebab');
  });

  it('ignores whitespace around the words', () => {
    expect(toSentenceCase('\thello \n world ')).toBe('Hello world');
  });

  it('returns an empty string when there are no words', () => {
    expect(toSentenceCase('')).toBe('');
    expect(toSentenceCase(' _-')).toBe('');
  });

  it('handles non-ASCII letters', () => {
    expect(toSentenceCase('ÉCOLE_PRIMAIRE')).toBe('École primaire');
    expect(toSentenceCase('über Uns')).toBe('Über uns');
    expect(toSentenceCase('日本語 テキスト')).toBe('日本語 テキスト');
  });

  it('capitalizes a first letter outside the BMP', () => {
    expect(toSentenceCase('𐐨𐐨 𐐨')).toBe('𐐀𐐨 𐐨');
  });

  it('keeps a first character that has no case', () => {
    expect(toSentenceCase('😀 Smile')).toBe('😀 smile');
    expect(toSentenceCase('123abc def')).toBe('123 abc def');
  });
});
