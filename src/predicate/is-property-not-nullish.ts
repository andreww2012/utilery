import {isPropertyPresent} from 'ts-extras';

/**
 * Creates a type guard that checks whether an object has an own property with the given key that is
 * neither `null` nor `undefined`.
 */
// eslint-disable-next-line unicorn/consistent-boolean-name
export const isPropertyNotNullish: {
  /**
   * Creates a type guard that checks whether an object has an own property with
   * the given key that is neither `null` nor `undefined`.
   * It narrows the type of the property, which TypeScript does not do on its own
   * in callbacks like the one of `Array.prototype.filter`.
   * Inherited properties and accessors do not count.
   * To only exclude `undefined`, use `isPropertyDefined`.
   * @param key - The key of the property.
   * @returns A type guard for objects whose property `key` is not nullish.
   * @example
   * const items = [{name: 'a', value: 1}, {name: 'b', value: null}];
   * items.filter(isPropertyNotNullish('value'));
   * // [{name: 'a', value: 1}] (type: {name: string; value: number}[])
   */
  <Key extends PropertyKey>(key: Key): ReturnType<typeof isPropertyPresent<Key>>;
} = isPropertyPresent;
