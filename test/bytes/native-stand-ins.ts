// Simple implementations of the native Base64 and hex methods of `Uint8Array`, for environments
// that don't have them

const ASCII_WHITESPACE_REGEX = /[\t\n\f\r ]/g;
const BASE64_REGEX = /^(?:[\d+/a-z]{4})*(?:[\d+/a-z]{2}(?:==)?|[\d+/a-z]{3}=?)?$/i;
const HEX_REGEX = /^(?:[\da-f]{2})*$/i;

const toBuffer = (bytes: Uint8Array) =>
  Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength);

export function toBase64StandIn(
  this: Uint8Array,
  {alphabet = 'base64', omitPadding = false}: {alphabet?: string; omitPadding?: boolean} = {},
) {
  const base64 = toBuffer(this).toString('base64');
  const encoded =
    alphabet === 'base64url' ? base64.replaceAll('+', '-').replaceAll('/', '_') : base64;
  return omitPadding ? encoded.replaceAll('=', '') : encoded;
}

export function toHexStandIn(this: Uint8Array) {
  return toBuffer(this).toString('hex');
}

// Only the standard alphabet and the default `lastChunkHandling: 'loose'` are supported
export const fromBase64StandIn = (base64: string) => {
  const compactBase64 = base64.replaceAll(ASCII_WHITESPACE_REGEX, '');
  if (!BASE64_REGEX.test(compactBase64)) {
    throw new SyntaxError('Invalid Base64 string');
  }

  return new Uint8Array(Buffer.from(compactBase64, 'base64'));
};

export const fromHexStandIn = (hex: string) => {
  if (!HEX_REGEX.test(hex)) {
    throw new SyntaxError('Invalid hexadecimal string');
  }

  return new Uint8Array(Buffer.from(hex, 'hex'));
};
