import {type DeepDelimiterKeys, deepDelimiterKeys} from 'string-ts';

/**
 * Returns a copy of a value with the keys of every object in it, including those nested in other
 * objects and in arrays, split into words and joined with the given delimiter, both at runtime and
 * in the type
 */
export const toDelimiterCaseKeysDeep: {
  /**
   * Returns a copy of a value with the keys of every object in it, including
   * those nested in other objects and in arrays, split into words and joined with
   * the given delimiter, both at runtime and in the type.
   * The case of the words is kept.
   * When two keys of an object convert to the same one, the later one wins.
   * To only convert the top-level keys, use `toDelimiterCaseKeys`.
   * @param value - The object or array to convert.
   * Not mutated.
   * @param delimiter - The string to put between the words.
   * @returns A copy with the converted keys.
   * @example
   * toDelimiterCaseKeysDeep({userId: 1, userAddress: {streetName: 'Main St'}}, ' ');
   * // {'user Id': 1, 'user Address': {'street Name': 'Main St'}}
   */
  <T, D extends string>(value: T, delimiter: D): DeepDelimiterKeys<T, D>;
} = deepDelimiterKeys;
