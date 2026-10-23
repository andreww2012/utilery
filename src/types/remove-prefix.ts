import type {RemovePrefix as RemovePrefixBase} from 'type-fest';

/** Options of `RemovePrefix` */
export interface RemovePrefixOptions {
  /**
   * Gives `string` when the prefix is not a literal, like `string` or
   * `` `${string}-` ``, as the result is unknown then.
   * When `false`, the prefix is removed as if its non-literal parts matched,
   * which may not match the runtime result.
   * Defaults to `true`
   */
  strict?: boolean;
}

/**
 * Removes a prefix from the start of a string literal type, or of each member of
 * a union.
 * A string that does not start with it is kept as is.
 * @example
 * type A = RemovePrefix<'on-change', 'on-'>;
 * //=> 'change'
 * type B = RemovePrefix<'sm:flex' | 'sm:p-4', 'sm:'>;
 * //=> 'flex' | 'p-4'
 * type C = RemovePrefix<'on-change', 'off-'>;
 * //=> 'on-change'
 */
export type RemovePrefix<
  S extends string,
  Prefix extends string,
  // eslint-disable-next-line ts/no-empty-object-type -- no options, so that the defaults apply
  Options extends RemovePrefixOptions = {},
> = RemovePrefixBase<S, Prefix, Options>;
