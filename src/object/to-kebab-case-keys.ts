import {type KebabKeys, kebabKeys} from 'string-ts';

/**
 * Returns a new object with the top-level keys converted to kebab-case, both at runtime and in the
 * type
 */
export const toKebabCaseKeys: {
  /**
   * Returns a new object with the top-level keys converted to kebab-case, both
   * at runtime and in the type.
   * Nested objects are kept as they are: to convert them too, use
   * `toKebabCaseKeysDeep`.
   * When two keys convert to the same one, the later one wins.
   * @param object - The object to convert.
   * Not mutated.
   * Arrays and built-in objects like dates and maps are returned as they are,
   * but class instances are converted like plain objects.
   * Inherited enumerable keys are copied too.
   * @returns A new object with the converted keys.
   * @example
   * toKebabCaseKeys({userId: 1, first_name: 'Ada'});
   * // {'user-id': 1, 'first-name': 'Ada'}
   */
  <T>(object: T): KebabKeys<T>;
} = kebabKeys;
