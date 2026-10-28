import dedentBase from 'dedent';

interface DedentOptions {
  /**
   * Indents every line after the first of a multi-line interpolated value, so
   * that it starts in the same column as the first one.
   * Defaults to `false`
   */
  alignValues?: boolean;

  /**
   * Turns escapes like `\n`, `` \` ``, `\$` and `\{` into the characters they
   * stand for, and removes an escaped line break with the indentation after it.
   * Defaults to `true` when called as a template tag, `false` when called as a
   * function
   */
  escapeSpecialCharacters?: boolean;

  /**
   * Removes the whitespace at the start and the end of the result.
   * Defaults to `true`
   */
  trimWhitespace?: boolean;
}

interface Dedent {
  /**
   * Removes the common indentation of the lines of a string, and the
   * whitespace at its start and end.
   * Lines without indentation don't count, so `dedent('a\n  b')` gives
   * `'a\nb'`.
   * @param text - The string to dedent.
   * @returns The string without the common indentation.
   * @example
   * dedent('\n    a\n      b\n');
   * // 'a\n  b'
   */
  (text: string): string;

  /**
   * Removes the common indentation of the lines of a template literal, and the
   * whitespace at its start and end, so that multi-line strings can be indented
   * like the code around them.
   * Interpolated values are inserted before the indentation is removed.
   * Lines without indentation don't count.
   * @param strings - The literal parts of the template.
   * @param values - The interpolated values.
   * @returns The string without the common indentation.
   * @example
   * const message = dedent`
   *   Hello, ${name}!
   *     Welcome back.
   * `;
   * // 'Hello, Ada!\n  Welcome back.'
   */
  (strings: TemplateStringsArray, ...values: unknown[]): string;

  /** Creates a `dedent` with other options */
  withOptions: {
    /**
     * Creates a `dedent` with other options.
     * @param options - The options, merged into the current ones.
     * @returns A `dedent` that uses the options.
     * @example
     * dedent.withOptions({trimWhitespace: false})`
     *   hello
     * `;
     * // '\nhello\n'
     */
    (options: DedentOptions): Dedent;
  };
}

/**
 * Removes the common indentation of the lines of a string, and the whitespace
 * at its start and end.
 * Works as a template tag and as a function
 */
export const dedent: Dedent = dedentBase;
