import {toConstantCaseKeys} from 'es-toolkit/object';
import type {ToConstantCaseKeys} from 'es-toolkit/types';

/**
 * Returns a copy of a value with the keys of every plain object in it, including those nested in
 * other objects and in arrays, converted to CONSTANT_CASE, both at runtime and in the type.
 */
export const toConstantCaseKeysDeep: {
  /**
   * Returns a copy of a value with the keys of every plain object in it,
   * including those nested in other objects and in arrays, converted to
   * CONSTANT_CASE, both at runtime and in the type.
   * Values other than arrays and plain objects, like dates or class instances,
   * are kept as they are.
   * When two keys of an object convert to the same one, the later one wins.
   * To only convert the top-level keys, use `toConstantCaseKeys`.
   * @param value - The object or array to convert.
   * Not mutated.
   * @returns A copy with the converted keys.
   * @example
   * toConstantCaseKeysDeep({userId: 1, userAddress: {streetName: 'Main St'}});
   * // {USER_ID: 1, USER_ADDRESS: {STREET_NAME: 'Main St'}}
   * @example
   * toConstantCaseKeysDeep([{userId: 1, userAddress: {streetName: 'Main St'}}]);
   * // [{USER_ID: 1, USER_ADDRESS: {STREET_NAME: 'Main St'}}]
   */
  <T>(value: T): ToConstantCaseKeys<T>;
} = toConstantCaseKeys;
