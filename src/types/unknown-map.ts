import type {UnknownMap as UnknownMapBase} from 'type-fest';

/**
 * Any `Map` or `ReadonlyMap`, with keys and values of unknown types.
 * Handy as a constraint that every map type satisfies.
 * @example
 * type IsMap<T> = T extends UnknownMap ? true : false;
 * type A = IsMap<ReadonlyMap<number, string>>;
 * //=> true
 * type B = IsMap<string>;
 * //=> false
 */
export type UnknownMap = UnknownMapBase;
