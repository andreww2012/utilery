import {stringify} from 'es-toolkit/query-string';
import type {MaybeReadonlyArray} from '../types/maybe-readonly-array.ts';

type QueryValue = string | number | boolean | bigint | null | undefined;

/** Converts a flat object into a URL query string like `?a=1&b=2` */
export const formatQueryString: {
  /**
   * Converts a flat object into a URL query string like `?a=1&b=2`.
   *
   * - `null` and `undefined` values are left out, also inside arrays.
   * - An array gives one parameter per element: `{a: [1, 2]}` → `?a=1&a=2`.
   * - Other values are converted with `String()`.
   * - Keys and values are percent-encoded like `encodeURIComponent` does, so a
   *   space becomes `%20` and `+` becomes `%2B`.
   * @param query - The object to convert.
   * Its own enumerable string keys are used, in their order.
   * @returns The query string starting with `?`, or `''` when no parameters
   * are left.
   * @throws {URIError} When a key or a value contains an unpaired surrogate.
   * @example
   * formatQueryString({page: 1, tags: ['a', 'b'], q: 'hello world', ref: undefined});
   * // '?page=1&tags=a&tags=b&q=hello%20world'
   * @example
   * formatQueryString({ref: undefined});
   * // ''
   */
  <T extends object & {[K in keyof T]: MaybeReadonlyArray<QueryValue>}>(query: T): string;
} = stringify;
