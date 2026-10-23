import type {Includes} from 'type-fest';

/**
 * Whether a tuple type includes an element exactly equal to `Item`.
 * @example
 * type A = ArrayIncludes<['red', 'green'], 'red'>;
 * //=> true
 * type B = ArrayIncludes<['red', 'green'], 'blue'>;
 * //=> false
 */
// eslint-disable-next-line ts/no-explicit-any -- the same constraint as the type it is built on
export type ArrayIncludes<TArray extends readonly any[], Item> = Includes<TArray, Item>;
