import {pascalCase} from 'es-toolkit/string';
import type {PascalCase} from 'string-ts';
import type {WidenNonLiteral} from '../_internal/types.ts';

/**
 * Converts a string to **PascalCase** (`'foo-bar'` → `'FooBar'`).
 * A string literal is typed as the exact Pascal-cased literal; a non-literal
 * `string` returns `string`.
 * @param value - The string to convert.
 * @returns The Pascal-cased string.
 * @example
 * toPascalCase('foo bar');
 * // 'FooBar'
 * @example
 * toPascalCase('XMLHttpRequest');
 * // 'XmlHttpRequest'
 */
export const toPascalCase = <S extends string>(value: S) =>
  pascalCase(value) as WidenNonLiteral<S, PascalCase<S>>;
