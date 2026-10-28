import {toCamelCaseKeys} from 'es-toolkit/object';
import type {ToCamelCaseKeys} from 'es-toolkit/types';

/**
 * Returns a copy of a value with the keys of every plain object in it, including those nested in
 * other objects and in arrays, converted to camelCase, both at runtime and in the type
 */
export const toCamelCaseKeysDeep: {
  /**
   * Returns a copy of a value with the keys of every plain object in it,
   * including those nested in other objects and in arrays, converted to
   * camelCase, both at runtime and in the type.
   * Values other than arrays and plain objects, like dates or class instances,
   * are kept as they are.
   * When two keys of an object convert to the same one, the later one wins.
   * To only convert the top-level keys, use `toCamelCaseKeys`.
   * @param value - The object or array to convert.
   * Not mutated.
   * @returns A copy with the converted keys.
   * @example
   * toCamelCaseKeysDeep({user_id: 1, user_address: {street_name: 'Main St'}});
   * // {userId: 1, userAddress: {streetName: 'Main St'}}
   * @example
   * toCamelCaseKeysDeep([{user_id: 1, user_address: {street_name: 'Main St'}}]);
   * // [{userId: 1, userAddress: {streetName: 'Main St'}}]
   */
  <T>(value: T): ToCamelCaseKeys<T>;
} = toCamelCaseKeys;
