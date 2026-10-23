import type {UnknownArray as UnknownArrayBase} from 'type-fest';

/**
 * Any array or tuple, readonly or not, with elements of unknown types:
 * `readonly unknown[]`.
 * Handy as a constraint that every array type satisfies.
 * @example
 * type IsArray<T> = T extends UnknownArray ? true : false;
 * type A = IsArray<readonly ['a']>;
 * //=> true
 * type B = IsArray<string>;
 * //=> false
 */
export type UnknownArray = UnknownArrayBase;
