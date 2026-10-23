import type {NonNullableDeep as NonNullableDeepBase} from 'type-fest';

/**
 * Removes `null` and `undefined` from a type, at any depth, including the
 * elements of arrays, maps and sets, the values of promises, and the
 * parameters and return values of functions.
 * Optional properties stay optional: to make them required too, combine it
 * with `RequiredDeep`.
 * @example
 * type Draft = {
 *   name: string | null;
 *   address: {city: string | undefined; landmark?: string | null};
 *   tags: (string | null)[];
 * };
 * type User = NonNullableDeep<Draft>;
 * //=> {name: string; address: {city: string; landmark?: string}; tags: string[]}
 */
export type NonNullableDeep<T> = NonNullableDeepBase<T>;
