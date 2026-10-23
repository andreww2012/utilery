import {stringToUint8Array as stringToUint8ArrayBase} from 'uint8array-extras';

/** Encodes a string as UTF-8 bytes */
export const stringToUint8Array: {
  /**
   * Encodes a string as UTF-8 bytes.
   * The reverse of `uint8ArrayToString`.
   * @param text - The string to encode.
   * @returns The UTF-8 bytes.
   * @example
   * stringToUint8Array('Hello');
   * // Uint8Array [72, 101, 108, 108, 111]
   * stringToUint8Array('€');
   * // Uint8Array [226, 130, 172]
   */
  (text: string): Uint8Array<ArrayBuffer>;
} = stringToUint8ArrayBase;
