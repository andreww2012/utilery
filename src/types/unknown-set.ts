import type {UnknownSet as UnknownSetBase} from 'type-fest';

/**
 * Any `Set` or `ReadonlySet`, with values of unknown types.
 * Handy as a constraint that every set type satisfies.
 * @example
 * type IsSet<T> = T extends UnknownSet ? true : false;
 * type A = IsSet<ReadonlySet<number>>;
 * //=> true
 * type B = IsSet<string>;
 * //=> false
 */
export type UnknownSet = UnknownSetBase;
