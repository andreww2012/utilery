import type {StringToArray as StringToArrayBase} from 'type-fest';

/** Options of `StringToArray` */
export interface StringToArrayOptions {
  /**
   * Gives a single element for each non-literal part of the string, like
   * `string`, instead of a rest element.
   * This may not match the runtime result: a `string` may have many
   * characters.
   * Defaults to `false`
   */
  mapNonLiteralsDirectly?: boolean;
}

/**
 * Splits a string literal type into a tuple type of its characters.
 * Non-literal parts, like `string`, become a rest element.
 * @example
 * type A = StringToArray<'abc'>;
 * //=> ['a', 'b', 'c']
 * type B = StringToArray<string>;
 * //=> string[]
 * type C = StringToArray<`on${string}`>;
 * //=> ['o', 'n', ...string[]]
 * type D = StringToArray<`on${string}`, {mapNonLiteralsDirectly: true}>;
 * //=> ['o', 'n', string]
 */
export type StringToArray<
  S extends string,
  // eslint-disable-next-line ts/no-empty-object-type -- no options, so that the defaults apply
  Options extends StringToArrayOptions = {},
> = StringToArrayBase<S, Options>;
