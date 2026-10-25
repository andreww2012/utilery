// cspell:ignore école primaire
import {sentenceCase} from 'es-toolkit/string';
import type {DelimiterCase} from 'string-ts';
import type {WidenNonLiteral} from '../_internal/types.ts';

// The package capitalizes only the first UTF-16 code unit, which misses letters outside the BMP
const capitalizeFirstCodePoint = (text: string) => {
  const [first = ''] = text;
  return first.toUpperCase() + text.slice(first.length);
};

/**
 * Converts a string to **Sentence case**: lower-case words joined by spaces, with
 * the first letter capitalized (`'fooBar'` → `'Foo bar'`).
 * A string literal is typed as the exact result; a non-literal `string` returns
 * `string`.
 * @param value - The string to convert.
 * @returns The sentence-cased string.
 * @example
 * toSentenceCase('fooBar');
 * // 'Foo bar'
 * @example
 * toSentenceCase('XMLHttpRequest');
 * // 'Xml http request'
 * @example
 * toSentenceCase('ÉCOLE_PRIMAIRE');
 * // 'École primaire'
 */
export const toSentenceCase = <S extends string>(value: S) =>
  capitalizeFirstCodePoint(sentenceCase(value)) as WidenNonLiteral<
    S,
    Capitalize<Lowercase<DelimiterCase<S, ' '>>>
  >;
