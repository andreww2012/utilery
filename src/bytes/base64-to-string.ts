// cspell:ignore Привет
import {base64ToUint8Array} from './base64-to-uint8-array.ts';
import {uint8ArrayToString} from './uint8-array-to-string.ts';

/**
 * Decodes a Base64 or Base64URL string (with or without the `=` padding) and
 * reads the bytes as UTF-8 text.
 * Unlike `atob`, decodes characters outside Latin-1, like emoji or Cyrillic
 * letters, correctly.
 * ASCII whitespace, like line breaks, is ignored.
 *
 * Throws a `SyntaxError` when the string is not valid Base64.
 * @param base64 - The Base64 or Base64URL string to decode.
 * @returns The decoded text.
 * @example
 * base64ToString('SGVsbG8=');
 * // 'Hello'
 * base64ToString('0J/RgNC40LLQtdGC');
 * // 'Привет'
 */
export const base64ToString = (base64: string): string =>
  uint8ArrayToString(base64ToUint8Array(base64));
