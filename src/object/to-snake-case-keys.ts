import {type SnakeKeys, snakeKeys} from 'string-ts';

/**
 * Returns a new object with the top-level keys converted to snake_case, both at runtime and in the
 * type.
 */
export const toSnakeCaseKeys: {
  /**
   * Returns a new object with the top-level keys converted to snake_case, both
   * at runtime and in the type.
   * Nested objects are kept as they are: to convert them too, use
   * `toSnakeCaseKeysDeep`.
   * When two keys convert to the same one, the later one wins.
   * @param object - The object to convert.
   * Not mutated.
   * Arrays and built-in objects like dates and maps are returned as they are,
   * but class instances are converted like plain objects.
   * Inherited enumerable keys are copied too.
   * @returns A new object with the converted keys.
   * @example
   * toSnakeCaseKeys({userId: 1, 'first-name': 'Ada'});
   * // {user_id: 1, first_name: 'Ada'}
   */
  <T>(object: T): SnakeKeys<T>;
} = snakeKeys;
