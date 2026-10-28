import {type CamelKeys, camelKeys} from 'string-ts';

/**
 * Returns a new object with the top-level keys converted to camelCase, both at runtime and in the
 * type
 */
export const toCamelCaseKeys: {
  /**
   * Returns a new object with the top-level keys converted to camelCase, both
   * at runtime and in the type.
   * Nested objects are kept as they are: to convert them too, use
   * `toCamelCaseKeysDeep`.
   * When two keys convert to the same one, the later one wins.
   * @param object - The object to convert.
   * Not mutated.
   * Arrays and built-in objects like dates and maps are returned as they are,
   * but class instances are converted like plain objects.
   * Inherited enumerable keys are copied too.
   * @returns A new object with the converted keys.
   * @example
   * toCamelCaseKeys({'user-id': 1, first_name: 'Ada'});
   * // {userId: 1, firstName: 'Ada'}
   */
  <T>(object: T): CamelKeys<T>;
} = camelKeys;
