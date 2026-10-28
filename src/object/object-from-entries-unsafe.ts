import {objectFromEntries} from 'ts-extras';

/**
 * Creates an object from `[key, value]` pairs, like `Object.fromEntries`, but typed with the keys
 * and values of the pairs instead of `string` keys
 */
export const objectFromEntriesUnsafe: {
  /**
   * Creates an object from `[key, value]` pairs, like `Object.fromEntries`, but
   * typed with the keys and values of the pairs instead of `string` keys.
   * For an array of unknown length the keys are optional, since some may be
   * missing: pass a tuple (`as const`) to get required keys.
   *
   * It is "unsafe" because the type cannot tell which pairs come last, so a key
   * repeated with values of different types is typed as the union of them.
   * @param entries - The `[key, value]` pairs.
   * @returns A new object with the given properties.
   * @example
   * objectFromEntriesUnsafe([['a', 1], ['b', 'x']] as const);
   * // {a: 1, b: 'x'} (type: {a: 1; b: 'x'})
   * @example
   * declare const entries: ['a' | 'b', number][];
   * objectFromEntriesUnsafe(entries);
   * // type: {a?: number; b?: number}
   */
  <Entries extends readonly (readonly [PropertyKey, unknown])[]>(
    entries: Entries,
  ): number extends Entries['length']
    ? {[Entry in Entries[number] as Entry[0]]?: Entry[1]}
    : {[Entry in Entries[number] as Entry[0]]: Entry[1]};
} = objectFromEntries;
