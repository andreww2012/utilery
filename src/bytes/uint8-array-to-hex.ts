import {uint8ArrayToHex as uint8ArrayToHexBase} from 'uint8array-extras';

/**
 * Encodes bytes as a lowercase hexadecimal string, two characters per byte.
 * @param bytes - The bytes to encode.
 * @returns The hexadecimal string.
 * @example
 * uint8ArrayToHex(new Uint8Array([72, 101, 108, 108, 111]));
 * // '48656c6c6f'
 * @example
 * // Hex digest of a hash
 * uint8ArrayToHex(await crypto.subtle.digest('SHA-256', data));
 */
export const uint8ArrayToHex: (bytes: Uint8Array | ArrayBuffer) => string = uint8ArrayToHexBase;
