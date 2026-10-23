import {type Slice, slice} from 'string-ts';

/**
 * Returns a part of a string, like `String.prototype.slice`, but the result type is the sliced
 * literal when the string and the indexes are literals.
 */
export const stringSlice: {
  /**
   * Returns a part of a string, like `String.prototype.slice`, but the result type
   * is the sliced literal when the string and the indexes are literals.
   * Negative indexes count from the end of the string.
   * @param text - The string to slice.
   * @param start - The index of the first character to include.
   * Defaults to `0`.
   * @param end - The index after the last character to include.
   * Defaults to the end of the string.
   * @returns The part of `text` from `start` up to, but not including, `end`.
   * @example
   * stringSlice('hello world', 6);
   * // 'world' (type: 'world')
   * stringSlice('hello world', 0, -6);
   * // 'hello' (type: 'hello')
   */
  <T extends string, S extends number = 0, E extends number | undefined = undefined>(
    text: T,
    start?: S,
    end?: E,
  ): Slice<T, S, E>;
} = slice;
