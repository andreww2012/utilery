import {type PascalKeys, pascalKeys} from 'string-ts';

/**
 * Returns a new object with the top-level keys converted to PascalCase, both at runtime and in the
 * type.
 */
export const toPascalCaseKeys: {
  /**
   * Returns a new object with the top-level keys converted to PascalCase, both
   * at runtime and in the type.
   * Nested objects are kept as they are: to convert them too, use
   * `toPascalCaseKeysDeep`.
   * When two keys convert to the same one, the later one wins.
   * @param object - The object to convert.
   * Not mutated.
   * Arrays and built-in objects like dates and maps are returned as they are,
   * but class instances are converted like plain objects.
   * Inherited enumerable keys are copied too.
   * @returns A new object with the converted keys.
   * @example
   * toPascalCaseKeys({userId: 1, first_name: 'Ada'});
   * // {UserId: 1, FirstName: 'Ada'}
   */
  <T>(object: T): PascalKeys<T>;
} = pascalKeys;
