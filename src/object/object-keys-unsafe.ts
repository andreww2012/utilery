import {objectKeys} from 'ts-extras';

/**
 * Returns the own enumerable string keys of an object, like `Object.keys`, but typed as the keys of
 * the object's type instead of `string`.
 */
export const objectKeysUnsafe: {
  /**
   * Returns the own enumerable string keys of an object, like `Object.keys`, but
   * typed as the keys of the object's type instead of `string`.
   * Number keys are typed as strings, like `'0'`, as they are at runtime.
   *
   * It is "unsafe" because an object may have more keys at runtime than its type
   * says, as TypeScript types are not exact.
   * @param value - The object to read.
   * @returns A new array of the keys.
   * @example
   * objectKeysUnsafe({a: 1, b: 2});
   * // ['a', 'b'] (type: ('a' | 'b')[])
   */
  <Type extends object>(value: Type): `${Exclude<keyof Type, symbol>}`[];
} = objectKeys;
