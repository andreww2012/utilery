import {uint8ArrayToBase64 as uint8ArrayToBase64Base} from 'uint8array-extras';

/** Options of `uint8ArrayToBase64` and `stringToBase64` */
export interface Base64EncodingOptions {
  /**
   * Use the URL-safe Base64URL alphabet (`-` and `_`) without padding.
   * Defaults to `false`
   */
  urlSafe?: boolean;
}

/**
 * Encodes bytes as a Base64 string.
 * Unlike `btoa`, works on bytes, so any binary data (and text encoded with
 * `stringToUint8Array`) is supported.
 *
 * Pass `{urlSafe: true}` for the URL-safe Base64URL alphabet (`-` and `_`
 * instead of `+` and `/`), without the `=` padding.
 * @param bytes - The bytes to encode.
 * @param options - Options.
 * @param options.urlSafe - Use the Base64URL alphabet without padding (defaults to `false`).
 * @returns The Base64 (or Base64URL) string.
 * @example
 * uint8ArrayToBase64(new Uint8Array([72, 101, 108, 108, 111]));
 * // 'SGVsbG8='
 * @example
 * // URL-safe alphabet, no padding
 * uint8ArrayToBase64(new Uint8Array([251, 255]), {urlSafe: true});
 * // '-_8'
 */
export const uint8ArrayToBase64 = (
  bytes: Uint8Array | ArrayBuffer,
  {urlSafe = false}: Base64EncodingOptions = {},
) => {
  // Not every supported environment has it
  const nativeBytes: Uint8Array & {
    toBase64?: (options: {alphabet: 'base64' | 'base64url'; omitPadding: boolean}) => string;
  } = bytes instanceof ArrayBuffer ? new Uint8Array(bytes) : bytes;

  return nativeBytes.toBase64
    ? nativeBytes.toBase64({alphabet: urlSafe ? 'base64url' : 'base64', omitPadding: urlSafe})
    : uint8ArrayToBase64Base(bytes, {urlSafe});
};
