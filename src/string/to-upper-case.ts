import {upperCase} from 'es-toolkit/string';
import type {DelimiterCase} from 'string-ts';
import type {WidenNonLiteral} from '../_internal/types.ts';

/**
 * Converts a string to **UPPER-CASE words joined by spaces** (`'fooBar'` →
 * `'FOO BAR'`).
 * A string literal is typed as the exact result; a non-literal `string` returns
 * `string`.
 * @param value - The string to convert.
 * @returns The space-joined upper-cased string.
 * @example
 * toUpperCase('fooBar');
 * // 'FOO BAR'
 * @example
 * toUpperCase('XMLHttpRequest');
 * // 'XML HTTP REQUEST'
 */
export const toUpperCase = <S extends string>(value: S) =>
  // eslint-disable-next-line un/no-type-assertion -- TypeScript can't check the result against its type-level conversion
  upperCase(value) as WidenNonLiteral<S, Uppercase<DelimiterCase<S, ' '>>>;
