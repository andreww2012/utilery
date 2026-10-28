// cspell:ignore neighbo neighborino tilery
import {truncate as truncateEnd} from 'es-toolkit/compat';
import type {Prettify} from '../types/prettify.ts';

interface BaseTruncateOptions {
  /**
   * The maximum length of the result, including the omission.
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
      /** Cuts at the last match of this pattern before the limit, to keep words whole */
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
 * truncate('/home/user/projects/utilery/src/index.ts', {length: 20, position: 'start', omission: '…'});
 * // '…tilery/src/index.ts'
 * truncate('a-very-long-file-name.tar.gz', {length: 15, position: 'middle', omission: '…'});
 * // 'a-very-….tar.gz'
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

  // eslint-disable-next-line ts/no-misused-spread -- code points, as for the `end` position
  const keptLength = Math.max(length - [...omission].length, 0);
  const headLength = position === 'middle' ? Math.ceil(keptLength / 2) : 0;
  return (
    characters.slice(0, headLength).join('') +
    omission +
    characters.slice(characters.length - (keptLength - headLength)).join('')
  );
};
