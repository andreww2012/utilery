// cspell:ignore Привет
import {base64ToString as base64ToStringBase} from 'uint8array-extras';

/**
 * Decodes a Base64 or Base64URL string (with or without the `=` padding) and
 * reads the bytes as UTF-8 text.
 * Unlike `atob`, decodes characters outside Latin-1, like emoji or Cyrillic
 * letters, correctly.
 *
 * Throws a `DOMException` (`InvalidCharacterError`) when the string is not
 * valid Base64.
 * @param base64 - The Base64 or Base64URL string to decode.
 * @returns The decoded text.
 * @example
 * base64ToString('SGVsbG8=');
 * // 'Hello'
 * base64ToString('0J/RgNC40LLQtdGC');
 * // 'Привет'
 */
export const base64ToString: (base64: string) => string = base64ToStringBase;
