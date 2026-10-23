import {type Includes, includes} from 'string-ts';

/**
 * Checks whether a string contains another one, like `String.prototype.includes`, but the result
 * type is `true` or `false` when the strings are literals.
 */
// eslint-disable-next-line unicorn/consistent-boolean-name
export const stringIncludes: {
  /**
   * Checks whether a string contains another one, like
   * `String.prototype.includes`, but the result type is `true` or `false` when
   * the strings are literals.
   * @param text - The string to search in.
   * @param search - The string to search for.
   * @param position - The index to start the search at.
   * Defaults to `0`.
   * @returns `true` if `text` contains `search` at or after `position`, otherwise `false`.
   * @example
   * stringIncludes('abcde', 'bcd');
   * // true (type: true)
   */
  <T extends string, S extends string, P extends number = 0>(
    text: T,
    search: S,
    position?: P,
  ): Includes<T, S, P>;
} = includes;
