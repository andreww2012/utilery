import {isPropertyDefined as isPropertyDefinedBase} from 'ts-extras';

/**
 * Creates a type guard that checks whether an object has an own property with the given key that is
 * not `undefined`.
 */
// eslint-disable-next-line unicorn/consistent-boolean-name
export const isPropertyDefined: {
  /**
   * Creates a type guard that checks whether an object has an own property with
   * the given key that is not `undefined`.
   * It narrows the type of the property, which TypeScript does not do on its own
   * in callbacks like the one of `Array.prototype.filter`.
   * Inherited properties and accessors do not count.
   * To also exclude `null`, use `isPropertyNotNullish`.
   * @param key - The key of the property.
   * @returns A type guard for objects whose property `key` is defined.
   * @example
   * const items = [{name: 'a', value: 1}, {name: 'b', value: undefined}];
   * items.filter(isPropertyDefined('value'));
   * // [{name: 'a', value: 1}] (type: {name: string; value: number}[])
   */
  <Key extends PropertyKey>(key: Key): ReturnType<typeof isPropertyDefinedBase<Key>>;
} = isPropertyDefinedBase;
