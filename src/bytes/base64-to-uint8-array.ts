import {base64ToUint8Array as base64ToUint8ArrayBase} from 'uint8array-extras';

/**
 * Decodes a Base64 or Base64URL string (with or without the `=` padding) into
 * bytes.
 *
 * Throws a `DOMException` (`InvalidCharacterError`) when the string is not
 * valid Base64.
 * @param base64 - The Base64 or Base64URL string to decode.
 * @returns The decoded bytes.
 * @example
 * base64ToUint8Array('SGVsbG8=');
 * // Uint8Array [72, 101, 108, 108, 111]
 * @example
 * // Base64URL without padding
 * base64ToUint8Array('-_8');
 * // Uint8Array [251, 255]
 */
export const base64ToUint8Array: (base64: string) => Uint8Array<ArrayBuffer> =
  base64ToUint8ArrayBase;
