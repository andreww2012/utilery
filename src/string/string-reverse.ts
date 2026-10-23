// cspell:ignore olleh
import {reverseString} from 'es-toolkit/string';
import type {Reverse} from 'string-ts';
import type {WidenNonLiteral} from '../_internal/types.ts';

/**
 * Reverses the characters of a string (`'abc'` → `'cba'`).
 * Reverses by grapheme, so multi-code-unit characters such as emoji stay intact.
 * A string literal is typed as the exact reversed literal; a non-literal
 * `string` returns `string`.
 * @param value - The string to reverse.
 * @returns The reversed string.
 * @example
 * stringReverse('hello');
 * // 'olleh'
 * @example
 * stringReverse('ab👍');
 * // '👍ba'
 */
export const stringReverse = <S extends string>(value: S) =>
  reverseString(value) as WidenNonLiteral<S, Reverse<S>>;
