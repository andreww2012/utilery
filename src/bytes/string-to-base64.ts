// cspell:ignore Привет
import {stringToBase64 as stringToBase64Base} from 'uint8array-extras';
import type {Base64EncodingOptions} from './uint8-array-to-base64.ts';

/**
 * Encodes a string as Base64, using its UTF-8 bytes. Unlike `btoa`, does not
 * throw on characters outside Latin-1, like emoji or Cyrillic letters.
 *
 * Pass `{urlSafe: true}` for the URL-safe Base64URL alphabet (`-` and `_`
 * instead of `+` and `/`), without the `=` padding. Decode with
 * `base64ToString`.
 * @param text - The string to encode.
 * @param options - Options.
 * @param options.urlSafe - Use the Base64URL alphabet without padding (defaults to `false`).
 * @returns The Base64 (or Base64URL) string.
 * @example
 * stringToBase64('Hello');
 * // 'SGVsbG8='
 * stringToBase64('Привет');
 * // '0J/RgNC40LLQtdGC'
 * @example
 * // URL-safe alphabet, no padding
 * stringToBase64('Привет', {urlSafe: true});
 * // '0J_RgNC40LLQtdGC'
 */
export const stringToBase64 = (text: string, {urlSafe = false}: Base64EncodingOptions = {}) =>
  stringToBase64Base(text, {urlSafe});
