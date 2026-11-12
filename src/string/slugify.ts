// cspell:ignore aepfel fooatunicorn strasse Straße ueber Äpfel über
import slugifyBase from '@sindresorhus/slugify';
import transliterate from '@sindresorhus/transliterate';
import anyAscii from 'any-ascii';

/** Options of `slugify` and `createUniqueSlugify` */
export interface SlugifyOptions {
  /**
   * The string that joins the words.
   * Defaults to `'-'`
   */
  readonly separator?: string;

  /**
   * Makes the slug lowercase.
   * Defaults to `true`
   */
  readonly lowercase?: boolean;

  /**
   * Splits camelCase words, so that `'fooBar'` becomes `'foo-bar'` instead of
   * `'foobar'`.
   * Defaults to `true`
   */
  readonly decamelize?: boolean;

  /**
   * `[from, to]` pairs replaced before anything else, like `[['@', 'at']]`.
   * A pair with the same `from` as a built-in one replaces it: the built-in
   * ones are `&` → `and`, `🦄` → `unicorn` and `♥` → `love`.
   * Put spaces around `to`, like `' at '`, to make it a separate word
   */
  readonly customReplacements?: readonly [string, string][];

  /**
   * Keeps an underscore at the start of the text, like in the name of a hidden
   * file.
   * Defaults to `false`
   */
  readonly preserveLeadingUnderscore?: boolean;

  /**
   * Keeps a dash at the end of the text, like while the user is still typing a
   * slug.
   * Defaults to `false`
   */
  readonly preserveTrailingDash?: boolean;

  /**
   * ASCII characters to keep, like `['#']`.
   * It must not contain `separator`.
   * The apostrophe of a word-final `'s` or `'t` is dropped anyway
   */
  readonly preserveCharacters?: string[];

  /**
   * The language of the text, for language-specific transliteration, like
   * `'sv'` for Swedish, where `ä` becomes `a` instead of `ae`
   */
  readonly locale?: string | undefined;
}

const LETTER_WITHOUT_CASE_REGEX = /\p{Lo}/gu;
const CAPITALIZED_REGEX = /^[A-Z]/;

/**
 * Transliterates text the way the package would, then turns whatever is left into ASCII.
 * A letter of a script without letter case that becomes a capitalized syllable, like a Chinese
 * character, becomes a word of its own: nothing else separates such syllables
 */
const toAscii = (text: string, {locale}: {locale: string | undefined}) =>
  anyAscii(
    transliterate(text, {...(locale && {locale})}).replaceAll(
      LETTER_WITHOUT_CASE_REGEX,
      (letter) => {
        const ascii = anyAscii(letter);
        return CAPITALIZED_REGEX.test(ascii) ? ` ${ascii} ` : ascii;
      },
    ),
  );

/**
 * Turns text into a URL-friendly slug: lowercase ASCII letters and digits
 * joined with dashes, like `'deja-vu'` for `'Déjà Vu!'`.
 * The result never contains characters outside ASCII: `preserveCharacters` only
 * keeps ASCII characters, and others are transliterated like the rest of the
 * text.
 *
 * Text in any script is transliterated: accented letters lose their accents,
 * German umlauts become `ae`/`oe`/`ue` and `ß` becomes `ss`, Cyrillic and Greek
 * are romanized, Chinese becomes Pinyin and Korean is romanized too, with a
 * word per character (also without `decamelize`), Japanese is romanized as
 * well, and emoji become their names.
 * `&` becomes `and`, camelCase words are split, and apostrophes in contractions
 * are dropped.
 *
 * Highlights of the options:
 *
 * - `separator` (`'-'` by default), `lowercase` (`true`) and `decamelize`
 *   (`true`).
 * - `customReplacements`: `[from, to]` pairs applied first, like
 *   `[['@', 'at']]`; they override the built-in ones (`&`, `♥`, `🦄`).
 * - `locale`: language-specific rules, like `'sv'` for Swedish `ä` → `a`.
 * - `preserveCharacters`, `preserveLeadingUnderscore`, `preserveTrailingDash`.
 *
 * For unique slugs, like heading IDs of a page, use `createUniqueSlugify`.
 * @param text - The text to turn into a slug.
 * @param options - Formatting options.
 * @returns The slug (an empty string if the text has no letters or digits).
 * @throws {RangeError} If the text or a custom replacement has more than 100
 * combining marks in a row.
 * @example
 * slugify('Déjà Vu!');
 * // 'deja-vu'
 * slugify('I ♥ Dogs & Cats');
 * // 'i-love-dogs-and-cats'
 * slugify('fooBar 123 $#%');
 * // 'foo-bar-123'
 * @example
 * // Other scripts
 * slugify('Привет, мир');
 * // 'privet-mir'
 * slugify('你好世界');
 * // 'ni-hao-shi-jie'
 * slugify('Straße über Äpfel');
 * // 'strasse-ueber-aepfel'
 * @example
 * // Options
 * slugify('BAR and baz', {separator: '_', lowercase: false});
 * // 'BAR_and_baz'
 * slugify('foo@unicorn', {customReplacements: [['@', 'at']]});
 * // 'fooatunicorn'
 */
export const slugify = (text: string, options?: SlugifyOptions): string =>
  slugifyBase(text, {...options, transliterate: toAscii});
