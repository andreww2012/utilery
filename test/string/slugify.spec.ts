// cspell:ignore fooatunicorn עברית हिन्दी 𝔘𝔫𝔦𝔠𝔬𝔡𝔢
import {slugify} from '../../src/string/slugify.ts';

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

  it('never returns characters outside ASCII', () => {
    const inputs = ['日本語のテキスト', 'עברית', 'हिन्दी', 'ไทย', '𝔘𝔫𝔦𝔠𝔬𝔡𝔢', '«»„“'];

    inputs.forEach((input) => {
      expect(slugify(input)).toMatch(/^[\d\-a-z]*$/);
    });
  });

  it('supports the options', () => {
    expect(slugify('BAR and baz', {separator: '_', lowercase: false})).toBe('BAR_and_baz');
    expect(slugify('fooBar', {decamelize: false})).toBe('foobar');
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
});
