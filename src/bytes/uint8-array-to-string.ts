import {uint8ArrayToString as uint8ArrayToStringBase} from 'uint8array-extras';

/**
 * Decodes bytes as text. UTF-8 by default; any other encoding supported by
 * `TextDecoder` can be passed (use `'latin1'` instead of Node's `'binary'`,
 * and `'utf-16le'` instead of `'utf16le'`).
 *
 * Invalid byte sequences are replaced with `U+FFFD` (`'�'`) instead of
 * throwing.
 * @param bytes - The bytes to decode.
 * @param encoding - The encoding of the bytes (defaults to `'utf8'`).
 * @returns The decoded text.
 * @example
 * uint8ArrayToString(new Uint8Array([72, 101, 108, 108, 111]));
 * // 'Hello'
 * @example
 * // Another encoding
 * uint8ArrayToString(new Uint8Array([167, 65, 166, 110]), 'big5');
 * // '你好'
 */
export const uint8ArrayToString: (bytes: Uint8Array | ArrayBuffer, encoding?: string) => string =
  uint8ArrayToStringBase;
