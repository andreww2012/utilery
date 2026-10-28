import {type Length, length} from 'string-ts';

/**
 * Returns the length of a string, like `String.prototype.length`, but the result type is a number
 * literal when the string is a literal
 */
export const stringLength: {
  /**
   * Returns the length of a string, like `String.prototype.length`, but the
   * result type is a number literal when the string is a literal.
   * The length is counted in UTF-16 code units, so an emoji may count as `2`.
   * For the number of terminal columns, use `getStringWidth`.
   * @param text - The string to measure.
   * @returns The number of UTF-16 code units in `text`.
   * @example
   * stringLength('hello world');
   * // 11 (type: 11)
   */
  <T extends string>(text: T): Length<T>;
} = length;
