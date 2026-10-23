import {lowerCase} from 'es-toolkit/string';
import type {DelimiterCase} from 'string-ts';
import type {WidenNonLiteral} from '../_internal/types.ts';

/**
 * Converts a string to **lower-case words joined by spaces** (`'fooBar'` →
 * `'foo bar'`).
 * A string literal is typed as the exact result; a non-literal `string` returns
 * `string`.
 * @param value - The string to convert.
 * @returns The space-joined lower-cased string.
 * @example
 * toLowerCase('fooBar');
 * // 'foo bar'
 * @example
 * toLowerCase('XMLHttpRequest');
 * // 'xml http request'
 */
export const toLowerCase = <S extends string>(value: S) =>
  lowerCase(value) as WidenNonLiteral<S, Lowercase<DelimiterCase<S, ' '>>>;
