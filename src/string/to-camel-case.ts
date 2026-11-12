import {camelCase} from 'es-toolkit/string';
import type {CamelCase} from 'string-ts';
import type {WidenNonLiteral} from '../_internal/types.ts';

/**
 * Converts a string to **camelCase** (`'foo-bar'` → `'fooBar'`).
 * A string literal is typed as the exact camel-cased literal; a non-literal
 * `string` returns `string`.
 * @param value - The string to convert.
 * @returns The camel-cased string.
 * @example
 * toCamelCase('foo bar');
 * // 'fooBar'
 * @example
 * toCamelCase('XMLHttpRequest');
 * // 'xmlHttpRequest'
 */
export const toCamelCase = <S extends string>(value: S) =>
  // eslint-disable-next-line un/no-type-assertion -- TypeScript can't check the result against its type-level conversion
  camelCase(value) as WidenNonLiteral<S, CamelCase<S>>;
