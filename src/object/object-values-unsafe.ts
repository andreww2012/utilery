import {objectValues} from 'ts-extras';

/**
 * Returns the own enumerable string-keyed property values of an object, like
 * `Object.values`, but typed with the value types of the object's own keys,
 * without `undefined` for optional keys.
 *
 * It is "unsafe" because an object may have more keys at runtime than its type
 * says, as TypeScript types are not exact.
 * @param value - The object to read.
 * @returns A new array of the values.
 * @example
 * const user: {name: string; age?: number} = {name: 'Ada', age: 36};
 * objectValuesUnsafe(user);
 * // ['Ada', 36] (type: (string | number)[])
 */
export const objectValuesUnsafe: typeof objectValues = objectValues;
