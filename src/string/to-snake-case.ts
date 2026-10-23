import {snakeCase} from 'es-toolkit/string';
import type {SnakeCase} from 'string-ts';
import type {WidenNonLiteral} from '../_internal/types.ts';

/**
 * Converts a string to **snake_case** (`'fooBar'` → `'foo_bar'`).
 * A string literal is typed as the exact snake-cased literal; a non-literal
 * `string` returns `string`.
 * @param value - The string to convert.
 * @returns The snake-cased string.
 * @example
 * toSnakeCase('fooBar');
 * // 'foo_bar'
 * @example
 * toSnakeCase('XMLHttpRequest');
 * // 'xml_http_request'
 */
export const toSnakeCase = <S extends string>(value: S) =>
  snakeCase(value) as WidenNonLiteral<S, SnakeCase<S>>;
