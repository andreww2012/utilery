import type {PartialOnUndefinedDeep} from 'type-fest';

/** Options of `OptionalizeUndefinedDeep` */
export interface OptionalizeUndefinedDeepOptions {
  /**
   * Also changes the elements of arrays and tuples.
   * Defaults to `false`
   */
  readonly recurseIntoArrays?: boolean;
}

/**
 * Makes every property whose type includes `undefined` optional, at any depth,
 * so that such properties can be left out instead of set to `undefined`.
 * Arrays and tuples are not changed, unless the options say otherwise.
 * @example
 * type Settings = {
 *   name: string;
 *   size: number | undefined;
 *   theme: {color: string | undefined};
 * };
 * const settings: OptionalizeUndefinedDeep<Settings> = {name: 'app', theme: {}};
 */
export type OptionalizeUndefinedDeep<
  T,
  // eslint-disable-next-line ts/no-empty-object-type -- no options, so that the defaults apply
  Options extends OptionalizeUndefinedDeepOptions = {},
> = PartialOnUndefinedDeep<T, Options>;
