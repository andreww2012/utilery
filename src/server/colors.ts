import {colors as colorsBase} from 'es-toolkit/server';
import {mapValues} from '../object/map-values.ts';
import {isColorSupported} from './is-color-supported.ts';

/**
 * A function that styles text, like the ones in `colors`.
 * @example
 * const highlight: ColorFunction = (text) => colors.bold(colors.yellow(text));
 */
export type ColorFunction = (text: string) => string;

const plainWhenUnsupported =
  (style: ColorFunction): ColorFunction =>
  (text) =>
    isColorSupported() ? style(text) : text;

const plainWhenUnsupportedFactory =
  <Arguments extends unknown[]>(createStyle: (...parameters: Arguments) => ColorFunction) =>
  (...callArguments: Arguments) =>
    plainWhenUnsupported(createStyle(...callArguments));

const {ansi256, bgAnsi256, rgb, bgRgb, hex, bgHex, ...styles} = colorsBase;

/**
 * Functions that style text for terminals with ANSI escape codes: modifiers
 * (`bold`, `dim`, `italic`, `underline`, etc.), foreground colors (`red`,
 * `greenBright`, etc.), background colors (`bgRed`, etc.) and custom colors
 * (`hex`, `rgb`, `ansi256` and their `bg*` versions, which return a style).
 *
 * Styles can be nested.
 * When colors are not supported (see `isColorSupported`: output piped to a
 * file, `NO_COLOR`, `FORCE_COLOR=0`, etc.), the text is returned unchanged; set
 * `FORCE_COLOR=1` to always color.
 * @example
 * console.log(colors.red('Error:'), colors.bold('file not found'));
 * console.log(colors.green(`all ${colors.bold('5')} tests passed`));
 * @example
 * // Custom colors
 * console.log(colors.hex('#ff6347')('tomato'), colors.bgAnsi256(57)('purple'));
 */
export const colors = Object.freeze({
  ...mapValues(styles, plainWhenUnsupported),
  ansi256: plainWhenUnsupportedFactory(ansi256),
  bgAnsi256: plainWhenUnsupportedFactory(bgAnsi256),
  rgb: plainWhenUnsupportedFactory(rgb),
  bgRgb: plainWhenUnsupportedFactory(bgRgb),
  hex: plainWhenUnsupportedFactory(hex),
  bgHex: plainWhenUnsupportedFactory(bgHex),
});
