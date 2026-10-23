import {type ConstantKeys, constantKeys} from 'string-ts';

/**
 * Returns a new object with the top-level keys converted to CONSTANT_CASE, both at runtime and in
 * the type.
 */
export const toConstantCaseKeys: {
  /**
   * Returns a new object with the top-level keys converted to CONSTANT_CASE, both
   * at runtime and in the type.
   * Nested objects are kept as they are: to convert them too, use
   * `toConstantCaseKeysDeep`.
   * When two keys convert to the same one, the later one wins.
   * @param object - The object to convert.
   * Not mutated.
   * Arrays and built-in objects like dates and maps are returned as they are,
   * but class instances are converted like plain objects.
   * Inherited enumerable keys are copied too.
   * @returns A new object with the converted keys.
   * @example
   * toConstantCaseKeys({userId: 1, 'first-name': 'Ada'});
   * // {USER_ID: 1, FIRST_NAME: 'Ada'}
   */
  <T>(object: T): ConstantKeys<T>;
} = constantKeys;
