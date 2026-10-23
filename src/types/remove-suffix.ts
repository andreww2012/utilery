import type {RemoveSuffix as RemoveSuffixBase} from 'type-fest';

/** Options of `RemoveSuffix` */
export interface RemoveSuffixOptions {
  /**
   * Gives `string` when the suffix is not a literal, like `string` or
   * `` `.${string}` ``, as the result is unknown then.
   * When `false`, the suffix is removed as if its non-literal parts matched,
   * which may not match the runtime result.
   * Defaults to `true`
   */
  strict?: boolean;
}

/**
 * Removes a suffix from the end of a string literal type, or of each member of
 * a union.
 * A string that does not end with it is kept as is.
 * @example
 * type A = RemoveSuffix<'report.pdf', '.pdf'>;
 * //=> 'report'
 * type B = RemoveSuffix<'bg-blue-500' | 'text-red-500', '-500'>;
 * //=> 'bg-blue' | 'text-red'
 * type C = RemoveSuffix<'report.pdf', '.txt'>;
 * //=> 'report.pdf'
 */
export type RemoveSuffix<
  S extends string,
  Suffix extends string,
  // eslint-disable-next-line ts/no-empty-object-type -- no options, so that the defaults apply
  Options extends RemoveSuffixOptions = {},
> = RemoveSuffixBase<S, Suffix, Options>;
