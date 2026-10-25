// cspell:ignore ståle
import decodeUriComponent from 'decode-uri-component';

/**
 * Decodes a percent-encoded URI component, like `decodeURIComponent`, but never throws: most
 * malformed sequences, like a lone `%` or broken UTF-8 bytes, are kept as is while the rest is
 * still decoded.
 */
export const decodeUriComponentSafe: {
  /**
   * Decodes a percent-encoded URI component, like `decodeURIComponent`, but never
   * throws: most malformed sequences, like a lone `%` or broken UTF-8 bytes, are
   * kept as is while the rest is still decoded.
   * The exceptions are a `%C2` that isn't followed by a valid second byte, which
   * becomes the replacement character `U+FFFD`, and the byte order marks `%FE%FF`
   * and `%FF%FE`, which become two of them, no matter the case of hex digits.
   * Useful for paths and query values that come from users.
   * @param encoded - The percent-encoded string.
   * @returns The decoded string.
   * @example
   * decodeUriComponentSafe('st%C3%A5le');
   * // 'ståle'
   * @example
   * // `decodeURIComponent` would throw on these
   * decodeUriComponentSafe('100%');
   * // '100%'
   * decodeUriComponentSafe('%E0%A4%A ok %C3%A5');
   * // '%E0%A4%A ok å'
   * @example
   * decodeUriComponentSafe('%C2 %FE%FF');
   * // '� ��'
   */
  (encoded: string): string;
} = decodeUriComponent;
