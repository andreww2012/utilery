import type {ObjectValue} from '../_internal/object-entries.ts';

/**
 * Returns the own enumerable string-keyed property values of an object, like `Object.values`, but
 * typed with the value types of the object's own keys
 */
export const objectValuesUnsafe: {
  /**
   * Returns the own enumerable string-keyed property values of an object, like
   * `Object.values`, but typed with the value types of the object's own keys.
   * For an array or a tuple, the values are its elements and the values of its
   * other own keys, like `index` of a regex match.
   * For a union of objects, the values of all its members are given.
   * Values of optional properties include `undefined`, as such a property may be
   * set to it, unless the `exactOptionalPropertyTypes` compiler option is on.
   *
   * It is "unsafe" because an object may have more keys at runtime than its type
   * says, as TypeScript types are not exact.
   * In generic code, the values are typed as for a value of the type
   * parameter's constraint.
   * @param value - The object to read.
   * @returns A new array of the values.
   * @example
   * const user: {name: string; age?: number} = {name: 'Ada', age: undefined};
   * objectValuesUnsafe(user);
   * // ['Ada', undefined] (type: (string | number | undefined)[])
   */
  <Type extends object>(value: Type): ObjectValue<Type>[];
} = Object.values;
