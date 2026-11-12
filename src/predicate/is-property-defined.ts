import {isPropertyDefined as isPropertyDefinedBase} from 'ts-extras';

/**
 * Creates a type guard that checks whether an object has an own property with the given key that is
 * not `undefined`
 */
// eslint-disable-next-line unicorn/consistent-boolean-name -- creates a type guard, so it is named like one
export const isPropertyDefined: {
  /**
   * Creates a type guard that checks whether an object has an own property with
   * the given key that is not `undefined`.
   * It narrows the type of the property, which TypeScript does not do on its own
   * in callbacks like the one of `Array.prototype.filter`.
   * Inherited properties and accessors do not count.
   * When the guard returns `false`, it drops an object whose type has the
   * property with a type without `undefined`, even though the property may be
   * inherited or an accessor, like a method or a getter of a class: such an
   * object type becomes `never`, and `Counter | undefined` becomes `undefined`.
   * With a key of a wide type, like `string`, it drops any object.
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
