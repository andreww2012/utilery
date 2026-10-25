import type {ObjectEntry} from '../_internal/object-entries.ts';

/**
 * Returns the own enumerable string-keyed entries of an object, like `Object.entries`, but typed
 * with the keys and values of the object's type instead of `string` keys.
 */
export const objectEntriesUnsafe: {
  /**
   * Returns the own enumerable string-keyed entries of an object, like
   * `Object.entries`, but typed with the keys and values of the object's type
   * instead of `string` keys.
   * Number keys are typed as strings, like `'0'`, as they are at runtime.
   * For an array or a tuple, the keys are its index strings and its other own
   * keys, like `index` of a regex match.
   * For a union of objects, each entry is typed by one member of the union.
   * Values of optional properties include `undefined`, as such a property may be
   * set to it, unless the `exactOptionalPropertyTypes` compiler option is on.
   *
   * It is "unsafe" because an object may have more keys at runtime than its type
   * says, as TypeScript types are not exact.
   * In generic code, the entries are typed as for a value of the type
   * parameter's constraint.
   * @param value - The object to read.
   * @returns A new array of `[key, value]` pairs.
   * @example
   * objectEntriesUnsafe({a: 1, b: 2});
   * // [['a', 1], ['b', 2]] (type: ['a' | 'b', number][])
   * @example
   * const user: {name: string; age?: number} = {name: 'Ada', age: undefined};
   * objectEntriesUnsafe(user);
   * // [['name', 'Ada'], ['age', undefined]]
   * // (type: ['name' | 'age', string | number | undefined][])
   */
  <Type extends object>(value: Type): ObjectEntry<Type>[];
} = Object.entries;
