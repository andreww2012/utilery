import {styleText as styleTextBase} from 'node:util';

interface StyleTextOptions {
  /**
   * Checks whether `stream` supports colors, and returns `text` unchanged when
   * it does not.
   * Defaults to `true`
   */
  // eslint-disable-next-line sonar/no-redundant-optional -- allows an explicit `undefined` with `exactOptionalPropertyTypes`
  validateStream?: boolean | undefined;

  /**
   * The stream the text is written to, checked for color support.
   * Defaults to `process.stdout`
   */
  // eslint-disable-next-line sonar/no-redundant-optional -- allows an explicit `undefined` with `exactOptionalPropertyTypes`
  stream?: NodeJS.WritableStream | undefined;
}

/**
 * Styles text for terminals with ANSI escape codes, like a color, a background color or a modifier
 * such as `'bold'` or `'underline'`.
 */
export const styleText: {
  /**
   * Styles text for terminals with ANSI escape codes, like a color, a background
   * color or a modifier such as `'bold'` or `'underline'`.
   * The text is returned unchanged when the stream does not support colors, which
   * also depends on the `NO_COLOR`, `NODE_DISABLE_COLORS` and `FORCE_COLOR`
   * environment variables.
   * Formats in an array are applied left to right, so a later color replaces an
   * earlier one.
   * `'none'` adds no style.
   * Node.js only.
   * @param format - A format, or an array of formats.
   * @param text - The text to style.
   * @param options - Options.
   * @param options.validateStream - Checks whether `stream` supports colors.
   * Defaults to `true`.
   * @param options.stream - The stream the text is written to.
   * Defaults to `process.stdout`.
   * @returns The styled text.
   * @throws {TypeError} When a format is unknown.
   * @example
   * console.log(styleText('green', 'Success!'));
   * @example
   * console.error(styleText(['red', 'bold'], 'Error!', {stream: process.stderr}));
   */
  (format: Parameters<typeof styleTextBase>[0], text: string, options?: StyleTextOptions): string;
} = styleTextBase;
