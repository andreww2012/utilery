import {type Repeat, repeat} from 'string-ts';

/**
 * Repeats a string, like `String.prototype.repeat`, but the result type is the repeated literal
 * when the string and the count are literals
 */
export const stringRepeat: {
  /**
   * Repeats a string, like `String.prototype.repeat`, but the result type is the
   * repeated literal when the string and the count are literals.
   * @param text - The string to repeat.
   * @param count - How many times to repeat it.
   * Defaults to `0`.
   * @returns The repeated string.
   * @throws {RangeError} When `count` is negative or infinite.
   * @example
   * stringRepeat('-', 3);
   * // '---' (type: '---')
   */
  <T extends string, N extends number = 0>(text: T, count?: N): Repeat<T, N>;
} = repeat;
