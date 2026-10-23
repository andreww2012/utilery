// cspell:ignore héllo

/**
 * Counts the bytes of a string encoded as UTF-8, without encoding it: the same
 * as `new TextEncoder().encode(text).length`, but faster and without allocating
 * memory.
 * Useful for size limits of headers, keys or messages.
 *
 * A lone surrogate counts as 3 bytes, as it is encoded as the replacement
 * character (`U+FFFD`).
 * @param text - The string to measure.
 * @returns The number of UTF-8 bytes.
 * @example
 * stringByteLength('hello');
 * // 5
 * stringByteLength('héllo');
 * // 6
 * stringByteLength('😀');
 * // 4
 */
export const stringByteLength = (text: string) => {
  let bytes = 0;
  for (let index = 0; index < text.length; index++) {
    // UTF-16 code units are read on purpose, surrogate pairs are handled below
    // eslint-disable-next-line unicorn/prefer-code-point
    const code = text.charCodeAt(index);
    if (code < 0x80) {
      bytes += 1;
    } else if (code < 0x8_00) {
      bytes += 2;
    } else if (
      code >= 0xd8_00 &&
      code <= 0xdb_ff &&
      // eslint-disable-next-line unicorn/prefer-code-point
      (text.charCodeAt(index + 1) & 0xfc_00) === 0xdc_00
    ) {
      // A surrogate pair is one code point of 4 bytes
      bytes += 4;
      index++;
    } else {
      bytes += 3;
    }
  }

  return bytes;
};
