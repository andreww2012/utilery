import {stringEndsWith} from 'ts-extras';

/**
 * Checks whether a string ends with another string, like `String.prototype.endsWith`, but as a type
 * guard: when it returns `true`, the string is narrowed to the ones with that suffix
 */
// eslint-disable-next-line unicorn/consistent-boolean-name -- named after `String.prototype.endsWith`
export const endsWith: {
  /**
   * Checks whether a string ends with another string, like
   * `String.prototype.endsWith`, but as a type guard: when it returns `true`, a
   * `string` is narrowed to a template literal type with that suffix, and a
   * union of string literals to the members with it.
   * When it returns `false`, the union keeps the other members.
   * The suffix must be a single string literal for that.
   * @param text - The string to check.
   * @param search - The suffix to look for.
   * @returns `true` if `text` ends with `search`, otherwise `false`.
   * @example
   * declare const fileName: string;
   * if (endsWith(fileName, '.json')) {
   *   fileName; // `${string}.json`
   * }
   * @example
   * declare const unit: '10px' | '2em' | '5px';
   * if (endsWith(unit, 'px')) {
   *   unit; // '10px' | '5px'
   * } else {
   *   unit; // '2em'
   * }
   */
  <StringType extends string, Suffix extends string>(
    text: StringType,
    search: Parameters<typeof stringEndsWith<StringType, Suffix>>[1],
  ): text is StringType & `${string}${Suffix}`;

  /**
   * Checks whether a string ends with another string, like
   * `String.prototype.endsWith`.
   * @param text - The string to check.
   * @param search - The string to look for.
   * @param endPosition - The index in `text` where `search` must end.
   * Defaults to the length of `text`.
   * @returns `true` if `text` has `search` right before `endPosition`, otherwise `false`.
   * @example
   * endsWith('hello', 'el', 3);
   * // true
   */
  (text: string, search: string, endPosition?: number): boolean;
} = stringEndsWith;
