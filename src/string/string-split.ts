import {stringSplit as stringSplitBase} from 'ts-extras';
import type {StringSplit} from '../types/string-split.ts';

/**
 * Splits a string by a delimiter, like `String.prototype.split`, but the result type is a tuple of
 * the parts when the string and the delimiter are literals.
 */
export const stringSplit: {
  /**
   * Splits a string by a delimiter, like `String.prototype.split`, but the result
   * type is a tuple of the parts when the string and the delimiter are literals.
   * @param text - The string to split.
   * @param delimiter - The string to split at.
   * @returns A new array of the parts: a tuple for literals, otherwise `string[]`.
   * @example
   * stringSplit('foo-bar-baz', '-');
   * // ['foo', 'bar', 'baz'] (type: ['foo', 'bar', 'baz'])
   * @example
   * const [side, alignment] = stringSplit('top-start', '-');
   * // side: 'top', alignment: 'start'
   */
  <StringType extends string, Delimiter extends string>(
    text: StringType,
    delimiter: Delimiter,
  ): StringSplit<StringType, Delimiter>;
} = stringSplitBase;
