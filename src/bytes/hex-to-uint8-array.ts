import {hexToUint8Array as hexToUint8ArrayBase} from 'uint8array-extras';

const HEX_REGEX = /^(?:[\da-f]{2})*$/i;

/**
 * Decodes a hexadecimal string (lowercase or uppercase, two characters per
 * byte) into bytes.
 *
 * Throws a `SyntaxError` when the string has an odd length or a character that
 * is not a hexadecimal digit.
 * @param hex - The hexadecimal string to decode.
 * @returns The decoded bytes.
 * @example
 * hexToUint8Array('48656c6c6f');
 * // Uint8Array [72, 101, 108, 108, 111]
 * hexToUint8Array('FF00');
 * // Uint8Array [255, 0]
 */
export const hexToUint8Array = (hex: string): Uint8Array<ArrayBuffer> => {
  // Not every supported environment has it
  const nativeUint8Array: Uint8ArrayConstructor & {
    fromHex?: (hex: string) => Uint8Array<ArrayBuffer>;
  } = Uint8Array;
  if (nativeUint8Array.fromHex) {
    return nativeUint8Array.fromHex(hex);
  }

  // Checked here to throw the same error as the native method
  if (!HEX_REGEX.test(hex)) {
    throw new SyntaxError('Invalid hexadecimal string');
  }

  return hexToUint8ArrayBase(hex);
};
