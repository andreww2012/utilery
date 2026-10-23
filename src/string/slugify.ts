// cspell:ignore aepfel fooatunicorn strasse Straße ueber Äpfel über Привет
import slugifyBase, {type Options} from '@sindresorhus/slugify';
import BUILTIN_REPLACEMENTS from '@sindresorhus/slugify/overridable-replacements.js';
import transliterate from '@sindresorhus/transliterate';
import anyAscii from 'any-ascii';
import type {OmitStrict} from '../types/omit-strict.ts';

/** Options of `slugify` and `createUniqueSlugify` */
export type SlugifyOptions = OmitStrict<Options, 'transliterate'>;

/** Transliterates text the way the package would, then turns whatever is left into ASCII */
const toAscii = (text: string, options: SlugifyOptions = {}) =>
  anyAscii(
    transliterate(text, {
      customReplacements: new Map([...BUILTIN_REPLACEMENTS, ...(options.customReplacements || [])]),
      locale: options.locale,
    }),
  );

/** Options for the package once the text is already ASCII */
const toBaseOptions = (options: SlugifyOptions = {}) => ({
  ...options,
  customReplacements: [],
  transliterate: false,
});

/**
 * Turns text into a URL-friendly slug: lowercase ASCII letters and digits
 * joined with dashes, like `'deja-vu'` for `'Déjà Vu!'`.
 * The result never contains characters outside ASCII: `preserveCharacters` only
 * keeps ASCII characters, and others are transliterated like the rest of the
 * text.
 *
 * Text in any script is transliterated: accented letters lose their accents,
 * German umlauts become `ae`/`oe`/`ue` and `ß` becomes `ss`, Cyrillic and Greek
 * are romanized, Chinese becomes Pinyin syllables, Japanese and Korean are
 * romanized too, and emoji become their names.
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
export const slugify = (text: string, options?: SlugifyOptions) =>
  slugifyBase(toAscii(text, options), toBaseOptions(options));
