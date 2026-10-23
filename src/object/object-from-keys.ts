import {type FromKeys, fromKeys} from 'remeda';
import type {Prettify} from '../types/prettify.ts';

/**
 * Builds an object from an array of `keys`, using `mapper` to compute the value
 * for each key.
 * Each element of `keys` becomes a property whose value is the `mapper` result
 * for that key, the inverse direction of `mapValues` (you start from the keys
 * rather than an existing object).
 *
 * When `keys` is a tuple of literal keys the result is precisely typed (a record
 * with exactly those keys); a general `PropertyKey[]` yields a partial record.
 * @param keys - The keys to build the object from.
 * @param mapper - Computes each key's value.
 * Receives the key, its index, and the source array.
 * @returns A new object mapping every key to its computed value.
 * @example
 * // Literal keys: precisely typed result
 * objectFromKeys(['a', 'bb'], (key) => key.length);
 * // {a: 1, bb: 2}
 * @example
 * // The mapper receives the index too
 * objectFromKeys(['x', 'y'], (key, index) => `${key}${index}`);
 * // {x: 'x0', y: 'y1'}
 */
export const objectFromKeys = <T extends readonly PropertyKey[], V>(
  keys: T,
  mapper: (key: T[number], index: number, keys: T) => V,
): Prettify<FromKeys<T, V>> => fromKeys(keys, mapper);
