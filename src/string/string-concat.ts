import {type Concat, concat} from 'string-ts';

/**
 * Joins strings together, like `String.prototype.concat`, but the result type is the joined literal
 * when the strings are literals.
 */
export const stringConcat: {
  /**
   * Joins strings together, like `String.prototype.concat`, but the result type
   * is the joined literal when the strings are literals.
   * @param strings - The strings to join.
   * @returns The joined string.
   * @example
   * stringConcat('a', 'bc', 'def');
   * // 'abcdef' (type: 'abcdef')
   */
  <T extends string[]>(...strings: T): Concat<T>;
} = concat;
