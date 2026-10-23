import {deepTransformKeys} from 'string-ts';

/**
 * Returns a copy of a value with the keys of every object in it, including those nested in other
 * objects and in arrays, replaced by what a function returns for them.
 */
export const transformKeysDeep: {
  /**
   * Returns a copy of a value with the keys of every object in it, including
   * those nested in other objects and in arrays, replaced by what a function
   * returns for them.
   * The result keeps the type of `value`, so the type does not show the new keys.
   * For case conversions typed precisely, use `toCamelCaseKeysDeep` and the like.
   * When two keys of an object convert to the same one, the later one wins.
   * @param value - The object or array to convert.
   * Not mutated.
   * @param transform - Returns the new key for a key.
   * @returns A copy with the new keys, typed as `value`.
   * @example
   * transformKeysDeep({a: {b: [{c: 1}]}}, (key) => key.toUpperCase());
   * // {A: {B: [{C: 1}]}}
   */
  <T>(value: T, transform: (key: string) => string): T;
} = deepTransformKeys;
