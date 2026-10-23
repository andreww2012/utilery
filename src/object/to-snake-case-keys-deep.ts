import {toSnakeCaseKeys} from 'es-toolkit/object';
import type {ToSnakeCaseKeys} from 'es-toolkit/types';

/**
 * Returns a copy of a value with the keys of every plain object in it, including those nested in
 * other objects and in arrays, converted to snake_case, both at runtime and in the type.
 */
export const toSnakeCaseKeysDeep: {
  /**
   * Returns a copy of a value with the keys of every plain object in it,
   * including those nested in other objects and in arrays, converted to
   * snake_case, both at runtime and in the type.
   * Values other than arrays and plain objects, like dates or class instances,
   * are kept as they are.
   * When two keys of an object convert to the same one, the later one wins.
   * To only convert the top-level keys, use `toSnakeCaseKeys`.
   * @param value - The object or array to convert.
   * Not mutated.
   * @returns A copy with the converted keys.
   * @example
   * toSnakeCaseKeysDeep({userId: 1, userAddress: {streetName: 'Main St'}});
   * // {user_id: 1, user_address: {street_name: 'Main St'}}
   * @example
   * toSnakeCaseKeysDeep([{userId: 1, userAddress: {streetName: 'Main St'}}]);
   * // [{user_id: 1, user_address: {street_name: 'Main St'}}]
   */
  <T>(value: T): ToSnakeCaseKeys<T>;
} = toSnakeCaseKeys;
