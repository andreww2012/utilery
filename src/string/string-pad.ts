import {pad} from 'es-toolkit/string';

/** Pads a string on both sides to the given length, centering it */
export const stringPad: {
  /**
   * Pads a string on both sides to the given length, centering it.
   * When the padding cannot be split evenly, the right side gets the extra
   * character.
   * The padding characters repeat and are cut to fit.
   * A string that is already long enough, or an empty `characters`, gives the
   * string unchanged.
   * To pad one side only, use `padStart` or `padEnd`.
   * @param text - The string to pad.
   * @param length - The length of the result.
   * @param characters - The characters to pad with.
   * Defaults to a space.
   * @returns The padded string.
   * @example
   * stringPad('abc', 8);
   * // '  abc   '
   * stringPad('abc', 8, '_-');
   * // '_-abc_-_'
   * stringPad('abc', 2);
   * // 'abc'
   */
  (text: string, length: number, characters?: string): string;
} = pad;
