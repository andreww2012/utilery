import {type DelimiterKeys, delimiterKeys} from 'string-ts';

/**
 * Returns a new object with the top-level keys split into words and joined with the given
 * delimiter, both at runtime and in the type.
 */
export const toDelimiterCaseKeys: {
  /**
   * Returns a new object with the top-level keys split into words and joined
   * with the given delimiter, both at runtime and in the type.
   * The case of the words is kept.
   * Nested objects are kept as they are: to convert them too, use
   * `toDelimiterCaseKeysDeep`.
   * When two keys convert to the same one, the later one wins.
   * @param object - The object to convert.
   * Not mutated.
   * Arrays and built-in objects like dates and maps are returned as they are,
   * but class instances are converted like plain objects.
   * Inherited enumerable keys are copied too.
   * @param delimiter - The string to put between the words.
   * @returns A new object with the converted keys.
   * @example
   * toDelimiterCaseKeys({userId: 1, 'first-name': 'Ada'}, '.');
   * // {'user.Id': 1, 'first.name': 'Ada'}
   */
  <T, D extends string>(object: T, delimiter: D): DelimiterKeys<T, D>;
} = delimiterKeys;
