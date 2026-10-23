const decodeBase64Fallback = (base64: string) => {
  try {
    // eslint-disable-next-line unicorn/prefer-code-point -- `atob` only gives Latin-1 characters, and `codePointAt` may return `undefined`
    return Uint8Array.from(atob(base64), (character) => character.charCodeAt(0));
  } catch (error) {
    // The native decoder throws a `SyntaxError`, and `atob` a `DOMException`
    throw new SyntaxError('Invalid Base64 string', {cause: error});
  }
};

/**
 * Decodes a Base64 or Base64URL string (with or without the `=` padding) into
 * bytes.
 * ASCII whitespace, like line breaks, is ignored.
 *
 * Throws a `SyntaxError` when the string is not valid Base64.
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
export const base64ToUint8Array = (base64: string) => {
  // The native decoder takes one alphabet at a time, so Base64URL is turned into Base64
  const standardBase64 = base64.replaceAll('-', '+').replaceAll('_', '/');
  // Not every supported environment has it
  const nativeUint8Array: Uint8ArrayConstructor & {
    fromBase64?: (base64: string) => Uint8Array<ArrayBuffer>;
  } = Uint8Array;

  return nativeUint8Array.fromBase64
    ? nativeUint8Array.fromBase64(standardBase64)
    : decodeBase64Fallback(standardBase64);
};
