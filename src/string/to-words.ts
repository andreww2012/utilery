import {words} from 'es-toolkit/string';
import type {Words} from 'string-ts';

/**
 * Splits a string into its constituent **words** (`'fooBarBaz'` →
 * `['foo', 'Bar', 'Baz']`), breaking on case boundaries, separators, and digit
 * runs while preserving each word's original case.
 * A string literal is typed as the exact tuple of word literals; a non-literal
 * `string` returns `string[]`.
 * @param value - The string to split.
 * @returns The tuple of words.
 * @example
 * toWords('fooBarBaz');
 * // ['foo', 'Bar', 'Baz']
 * @example
 * toWords('XMLHttpRequest');
 * // ['XML', 'Http', 'Request']
 */
export const toWords = <S extends string>(value: S) => words(value) as Words<S>;
