import {type SwappedProps, swapProps} from 'remeda';
import type {Prettify} from '../types/prettify.ts';

/**
 * Returns a new object with the values of two properties exchanged.
 * The result is precisely typed: the two keys also swap *types*, so swapping a
 * `number` key with a `string` key yields an object where the first key is now
 * `string` and the second `number`, something the native spread form
 * `{...object, [key1]: object[key2], [key2]: object[key1]}` cannot express (it
 * widens both to a union).
 *
 * This is the object counterpart of `arraySwapIndexes`.
 * @param object - The source object.
 * Not mutated.
 * @param key1 - The first property key.
 * @param key2 - The second property key.
 * @returns A new object with the values (and types) of `key1` and `key2` swapped.
 * @example
 * // Values and their types are swapped
 * swapObjectProperties({a: 1, b: 'x'}, 'a', 'b');
 * // {a: 'x', b: 1}
 */
export const swapObjectProperties = <T extends object, Key1 extends keyof T, Key2 extends keyof T>(
  object: T,
  key1: Key1,
  key2: Key2,
): Prettify<SwappedProps<T, Key1, Key2>> => swapProps(object, key1, key2);
