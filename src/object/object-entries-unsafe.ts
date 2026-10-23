import {objectEntries} from 'ts-extras';

/**
 * Returns the own enumerable string-keyed entries of an object, like
 * `Object.entries`, but typed with the keys and values of the object's type
 * instead of `string` keys.
 * For an array or a tuple, the keys are its index strings.
 *
 * It is "unsafe" because an object may have more keys at runtime than its type
 * says, as TypeScript types are not exact.
 * @param value - The object to read.
 * @returns A new array of `[key, value]` pairs.
 * @example
 * objectEntriesUnsafe({a: 1, b: 2});
 * // [['a', 1], ['b', 2]] (type: ['a' | 'b', number][])
 */
export const objectEntriesUnsafe: typeof objectEntries = objectEntries;
