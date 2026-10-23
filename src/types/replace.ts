import type {Replace as ReplaceBase} from 'type-fest';

/** Options of `Replace` */
export interface ReplaceOptions {
  /**
   * Replaces all the matches instead of only the first one, like
   * `String.prototype.replaceAll`.
   * Defaults to `false`
   */
  all?: boolean;
}

/**
 * A string literal type with the first match of `Search` (or all of them)
 * replaced by `Replacement`, like `String.prototype.replace` does at runtime.
 * @example
 * type A = Replace<'hello ??', '?', '!'>;
 * //=> 'hello !?'
 * type B = Replace<'10:42:00', ':', '-', {all: true}>;
 * //=> '10-42-00'
 */
export type Replace<
  Input extends string,
  Search extends string,
  Replacement extends string,
  // eslint-disable-next-line ts/no-empty-object-type -- no options, so that the defaults apply
  Options extends ReplaceOptions = {},
> = ReplaceBase<Input, Search, Replacement, Options>;
