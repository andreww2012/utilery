import {toKebabCaseKeys} from 'es-toolkit/object';
import type {ToKebabCaseKeys} from 'es-toolkit/types';

/**
 * Returns a copy of a value with the keys of every plain object in it, including those nested in
 * other objects and in arrays, converted to kebab-case, both at runtime and in the type.
 */
export const toKebabCaseKeysDeep: {
  /**
   * Returns a copy of a value with the keys of every plain object in it,
   * including those nested in other objects and in arrays, converted to
   * kebab-case, both at runtime and in the type.
   * Values other than arrays and plain objects, like dates or class instances,
   * are kept as they are.
   * When two keys of an object convert to the same one, the later one wins.
   * To only convert the top-level keys, use `toKebabCaseKeys`.
   * @param value - The object or array to convert.
   * Not mutated.
   * @returns A copy with the converted keys.
   * @example
   * toKebabCaseKeysDeep({userId: 1, userAddress: {streetName: 'Main St'}});
   * // {'user-id': 1, 'user-address': {'street-name': 'Main St'}}
   * @example
   * toKebabCaseKeysDeep([{userId: 1, userAddress: {streetName: 'Main St'}}]);
   * // [{'user-id': 1, 'user-address': {'street-name': 'Main St'}}]
   */
  <T>(value: T): ToKebabCaseKeys<T>;
} = toKebabCaseKeys;
