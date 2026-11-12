// cspell:ignore lery neighbo neighborino
import {truncate as truncateEnd} from 'es-toolkit/compat';
import type {Prettify} from '../types/prettify.ts';

interface BaseTruncateOptions {
  /**
   * The maximum length of the result, including the omission.
   * When the omission alone is longer, a string that doesn't fit becomes the
   * omission.
   * Defaults to `30`
   */
  length?: number;

  /**
   * The string that replaces the removed part.
   * Defaults to `'...'`
   */
  omission?: string;
}

/** Options of `truncate` */
export type TruncateOptions = Prettify<
  | (BaseTruncateOptions & {
      /**
       * Where to remove characters.
       * Defaults to `'end'`
       */
      position?: 'end';

      /**
       * Cuts before the last match of this pattern within the limit, or right at
       * the limit when a match starts there, to keep words whole
       */
      separator?: string | RegExp;
    })
  | (BaseTruncateOptions & {position: 'start' | 'middle'; separator?: never})
>;

/**
 * Shortens a string to a maximum length, replacing the removed part with an
 * omission (`'...'` by default).
 * Strings that fit are returned as is.
 * The length is counted in code points, so emoji are never split in half.
 *
 * The removed part is at the end by default; pass `position: 'start'` to keep
 * the end (like the end of a long path), or `'middle'` to keep both ends (like
 * a file name with its extension).
 * With the default `'end'` position, a `separator` makes the cut happen before
 * its last match within the limit, to avoid cutting a word in half.
 * When a match starts right at the limit, the string is cut there.
 * When `length` is shorter than the omission, a string that doesn't fit becomes
 * the omission alone, which is longer than `length`.
 * @param text - The string to truncate.
 * @param options - `length` (`30` by default), `omission` (`'...'` by default), `position` (`'end'`
 * by default) and `separator`.
 * @returns The string, shortened if needed.
 * @example
 * truncate('hi-diddly-ho there, neighborino');
 * // 'hi-diddly-ho there, neighbo...'
 * truncate('hi-diddly-ho there, neighborino', {length: 24, separator: ' '});
 * // 'hi-diddly-ho there,...'
 * @example
 * // Keep the end or both ends
 * truncate('/home/user/projects/utilery/src/index.ts', {length: 20, position: 'start'});
 * // '...lery/src/index.ts'
 * truncate('a-very-long-file-name.tar.gz', {length: 16, position: 'middle'});
 * // 'a-very-...tar.gz'
 */
export const truncate = (text: string, options: TruncateOptions = {}): string => {
  const {length = 30, omission = '...', position = 'end', separator} = options;
  if (position === 'end') {
    // The package writes an explicit `undefined` omission as `'undefined'`
    return truncateEnd(text, {length, omission, ...(separator != null && {separator})});
  }

  // eslint-disable-next-line ts/no-misused-spread -- code points, as for the `end` position
  const characters = [...text];
  if (characters.length <= length) {
    return text;
  }

  // Like the `end` position, ignores the decimal part of `length` and keeps nothing for `NaN`
  // eslint-disable-next-line ts/no-misused-spread -- code points, as for the `end` position
  const keptLength = Math.max(Math.floor(length) - [...omission].length, 0) || 0;
  const headLength = position === 'middle' ? Math.ceil(keptLength / 2) : 0;
  return (
    characters.slice(0, headLength).join('') +
    omission +
    characters.slice(characters.length - (keptLength - headLength)).join('')
  );
};
