import {constantCase} from 'es-toolkit/string';
import type {ConstantCase} from 'string-ts';
import type {WidenNonLiteral} from '../_internal/types.ts';

/**
 * Converts a string to **CONSTANT_CASE** (`'fooBar'` → `'FOO_BAR'`).
 * A string literal is typed as the exact constant-cased literal; a non-literal
 * `string` returns `string`.
 * @param value - The string to convert.
 * @returns The constant-cased string.
 * @example
 * toConstantCase('fooBar');
 * // 'FOO_BAR'
 * @example
 * toConstantCase('XMLHttpRequest');
 * // 'XML_HTTP_REQUEST'
 */
export const toConstantCase = <S extends string>(value: S) =>
  constantCase(value) as WidenNonLiteral<S, ConstantCase<S>>;
