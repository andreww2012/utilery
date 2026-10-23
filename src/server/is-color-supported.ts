/** A stream (like `process.stdout`) whose terminal decides whether colors are supported */
interface ColorStreamLike {
  isTTY?: boolean;
  hasColors?: () => boolean;
}

/**
 * Checks whether text written to a stream should be colored, following the
 * common conventions:
 *
 * - `FORCE_COLOR` decides first: colors are on unless it is `'0'` or `'false'`;
 * - otherwise, the stream must be a terminal (TTY) that supports colors, so
 *   output redirected to a file or another process is not colored;
 * - `NO_COLOR`, `NODE_DISABLE_COLORS` and `TERM=dumb` turn colors off.
 *
 * Evaluated on every call, as the environment may change.
 * @param stream - The stream the text will be written to (defaults to `process.stdout`).
 * @returns `true` if colors should be used, otherwise `false`.
 * @example
 * isColorSupported();
 * // true in a terminal, false when piped: `node script.js | cat`
 * isColorSupported(process.stderr);
 */
export const isColorSupported = (stream: ColorStreamLike = process.stdout): boolean => {
  const {FORCE_COLOR} = process.env;
  return FORCE_COLOR == null
    ? stream.isTTY === true && stream.hasColors?.() === true
    : FORCE_COLOR !== '0' && FORCE_COLOR !== 'false';
};
