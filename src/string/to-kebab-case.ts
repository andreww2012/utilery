import {kebabCase} from 'es-toolkit/string';
import type {KebabCase} from 'string-ts';
import type {WidenNonLiteral} from '../_internal/types.ts';

/**
 * Converts a string to **kebab-case** (`'fooBar'` → `'foo-bar'`).
 * A string literal is typed as the exact kebab-cased literal; a non-literal
 * `string` returns `string`.
 * @param value - The string to convert.
 * @returns The kebab-cased string.
 * @example
 * toKebabCase('fooBar');
 * // 'foo-bar'
 * @example
 * toKebabCase('XMLHttpRequest');
 * // 'xml-http-request'
 */
export const toKebabCase = <S extends string>(value: S) =>
  kebabCase(value) as WidenNonLiteral<S, KebabCase<S>>;
