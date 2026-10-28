import type {ObjectKey} from '../_internal/object-entries.ts';

/**
 * Returns the own enumerable string keys of an object, like `Object.keys`, but typed as the keys of
 * the object's type instead of `string`
 */
export const objectKeysUnsafe: {
  /**
   * Returns the own enumerable string keys of an object, like `Object.keys`, but
   * typed as the keys of the object's type instead of `string`.
   * Number keys are typed as strings, like `'0'`, as they are at runtime.
   * For an array or a tuple, the keys are its index strings and its other own
   * keys, like `index` of a regex match.
   * For a union of objects, the keys of all its members are given.
   *
   * It is "unsafe" because an object may have more keys at runtime than its type
   * says, as TypeScript types are not exact.
   * In generic code, the keys are typed as for a value of the type parameter's
   * constraint.
   * @param value - The object to read.
   * @returns A new array of the keys.
   * @example
   * objectKeysUnsafe({a: 1, b: 2});
   * // ['a', 'b'] (type: ('a' | 'b')[])
   * @example
   * objectKeysUnsafe(['x', 'y'] as const);
   * // ['0', '1'] (type: ('0' | '1')[])
   */
  <Type extends object>(value: Type): ObjectKey<Type>[];
} = Object.keys;
