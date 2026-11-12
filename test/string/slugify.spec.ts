import {slugify} from '../../src/string/slugify.ts';
import {EXPLICIT_UNDEFINED} from '../exact-optional-property-types.ts';

describe('string/slugify', () => {
  it('turns Latin text into a slug', () => {
    expect(slugify('Déjà Vu!')).toBe('deja-vu');
    expect(slugify('fooBar 123 $#%')).toBe('foo-bar-123');
    expect(slugify("It's 3.5 o'clock")).toBe('its-3-5-o-clock');
    expect(slugify(' Hello -- World__ ')).toBe('hello-world');
  });

  it('applies the built-in replacements', () => {
    expect(slugify('I ♥ Dogs & Cats')).toBe('i-love-dogs-and-cats');
    expect(slugify('🦄')).toBe('unicorn');
  });

  it('transliterates any script into ASCII', () => {
    expect(slugify('Привет, мир')).toBe('privet-mir'); // cspell:disable-line
    expect(slugify('Straße über Äpfel')).toBe('strasse-ueber-aepfel'); // cspell:disable-line
    expect(slugify('ελληνικά')).toBe('ellinika'); // cspell:disable-line
    expect(slugify('你好世界')).toBe('ni-hao-shi-jie');
    expect(slugify('Hello 你好 World')).toBe('hello-ni-hao-world');
    expect(slugify('ひらがな')).toBe('hirakana'); // cspell:disable-line
    expect(slugify('한국어')).toBe('han-gug-eo');
    expect(slugify('😄 emoji')).toBe('smile-emoji');
  });

  it('makes each Chinese character and Korean syllable a word', () => {
    expect(slugify('阿姨')).toBe('a-yi');
    expect(slugify('你好world')).toBe('ni-hao-world');
    expect(slugify('第2章')).toBe('di-2-zhang'); // cspell:disable-line
    expect(slugify('我用iPhone')).toBe('wo-yong-i-phone');
    expect(slugify('한국어', {decamelize: false})).toBe('han-gug-eo');
    expect(slugify('你好', {lowercase: false})).toBe('Ni-Hao');
  });

  it('keeps an uppercase word whose letters become several ones in one piece', () => {
    expect(slugify('ÜBER Straße')).toBe('ueber-strasse'); // cspell:disable-line
    expect(slugify('ЁЛКА Юрий')).toBe('yolka-yuriy'); // cspell:disable-line
    expect(slugify('A & B', {customReplacements: [['&', ' ÜBER ']]})).toBe('a-ueber-b'); // cspell:disable-line
  });

  it('never returns characters outside ASCII', () => {
    // cspell:disable-next-line
    const inputs = ['日本語のテキスト', 'עברית', 'हिन्दी', 'ไทย', '𝔘𝔫𝔦𝔠𝔬𝔡𝔢', '«»„“'];

    inputs.forEach((input) => {
      expect(slugify(input)).toMatch(/^[\d\-a-z]*$/);
    });

    // Turkish lowercases `I` to `ı`
    expect(slugify('I', {locale: 'tr'})).toBe('i');
  });

  it('throws for more than 100 combining marks in a row', () => {
    expect(slugify(`a${'\u{301}'.repeat(100)}`)).toBe('a');
    expect(() => slugify(`a${'\u{301}'.repeat(101)}`)).toThrow(RangeError);
    expect(() => slugify('a', {customReplacements: [[`b${'\u{301}'.repeat(101)}`, 'c']]})).toThrow(
      RangeError,
    );
  });

  it('supports the options', () => {
    expect(slugify('BAR and baz', {separator: '_', lowercase: false})).toBe('BAR_and_baz');
    expect(slugify('fooBar', {decamelize: false})).toBe('foobar');
    // cspell:disable-next-line
    expect(slugify('foo@unicorn', {customReplacements: [['@', 'at']]})).toBe('fooatunicorn');
    expect(slugify('A & B', {customReplacements: [['&', ' und ']]})).toBe('a-und-b');
    expect(slugify('Räksmörgås', {locale: 'sv'})).toBe('raksmorgas'); // cspell:disable-line
    expect(slugify('_foo-', {preserveLeadingUnderscore: true, preserveTrailingDash: true})).toBe(
      '_foo-',
    );
    expect(slugify('foo.bar', {preserveCharacters: ['.']})).toBe('foo.bar');
  });

  it('gives an empty string when there is nothing to keep', () => {
    expect(slugify('')).toBe('');
    expect(slugify('$#%')).toBe('');
  });

  it('treats options set to `undefined` like missing ones', () => {
    expect(
      slugify('Foo barBaz', {
        separator: EXPLICIT_UNDEFINED,
        lowercase: EXPLICIT_UNDEFINED,
        decamelize: EXPLICIT_UNDEFINED,
        preserveCharacters: EXPLICIT_UNDEFINED,
      }),
    ).toBe('foo-bar-baz');
  });
});
