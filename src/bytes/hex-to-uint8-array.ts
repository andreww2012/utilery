import {hexToUint8Array as hexToUint8ArrayBase} from 'uint8array-extras';

/**
 * Decodes a hexadecimal string (lowercase or uppercase, two characters per
 * byte) into bytes.
 *
 * Throws an `Error` when the string has an odd length or a character that is
 * not a hexadecimal digit.
 * @param hex - The hexadecimal string to decode.
 * @returns The decoded bytes.
 * @example
 * hexToUint8Array('48656c6c6f');
 * // Uint8Array [72, 101, 108, 108, 111]
 * hexToUint8Array('FF00');
 * // Uint8Array [255, 0]
 */
export const hexToUint8Array: (hex: string) => Uint8Array<ArrayBuffer> = hexToUint8ArrayBase;
