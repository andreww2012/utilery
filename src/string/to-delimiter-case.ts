import {words} from 'es-toolkit/string';
import type {DelimiterCase} from 'string-ts';

/**
 * Converts a string to a **custom delimiter case** by splitting it into words and
 * joining them with `delimiter`, preserving each word's original case
 * (`('fooBar', '.')` → `'foo.Bar'`).
 * Unlike `toKebabCase`/`toSnakeCase`, the case of the words is left untouched.
 * A string literal is typed as the exact result; a non-literal `string` returns
 * `string`.
 * @param value - The string to convert.
 * @param delimiter - The delimiter to join the words with.
 * @returns The delimiter-cased string.
 * @example
 * toDelimiterCase('fooBar', '.');
 * // 'foo.Bar'
 * @example
 * toDelimiterCase('XMLHttpRequest', '/');
 * // 'XML/Http/Request'
 */
export const toDelimiterCase = <S extends string, D extends string>(
  value: S,
  delimiter: D,
): DelimiterCase<S, D> => words(value).join(delimiter);
