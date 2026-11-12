import {stringStartsWith} from 'ts-extras';

/**
 * Checks whether a string starts with another string, like `String.prototype.startsWith`, but as a
 * type guard: when it returns `true`, the string is narrowed to the ones with that prefix
 */
// eslint-disable-next-line unicorn/consistent-boolean-name -- named after `String.prototype.startsWith`
export const startsWith: {
  /**
   * Checks whether a string starts with another string, like
   * `String.prototype.startsWith`, but as a type guard: when it returns `true`,
   * a `string` is narrowed to a template literal type with that prefix, and a
   * union of string literals to the members with it.
   * When it returns `false`, the union keeps the other members.
   * The prefix must be a single string literal for that.
   * @param text - The string to check.
   * @param search - The prefix to look for.
   * @returns `true` if `text` starts with `search`, otherwise `false`.
   * @example
   * declare const url: string;
   * if (startsWith(url, 'https://')) {
   *   url; // `https://${string}`
   * }
   * @example
   * declare const size: 'sm' | 'md' | 'lg';
   * if (startsWith(size, 's')) {
   *   size; // 'sm'
   * } else {
   *   size; // 'md' | 'lg'
   * }
   */
  <StringType extends string, Prefix extends string>(
    text: StringType,
    search: Parameters<typeof stringStartsWith<StringType, Prefix>>[1],
  ): text is StringType & `${Prefix}${string}`;

  /**
   * Checks whether a string starts with another string, like
   * `String.prototype.startsWith`.
   * @param text - The string to check.
   * @param search - The string to look for.
   * @param position - The index in `text` where `search` must start.
   * Defaults to `0`.
   * @returns `true` if `text` has `search` at `position`, otherwise `false`.
   * @example
   * startsWith('hello', 'll', 2);
   * // true
   */
  (text: string, search: string, position?: number): boolean;
} = stringStartsWith;
