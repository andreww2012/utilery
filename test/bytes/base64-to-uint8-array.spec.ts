import {base64ToUint8Array} from '../../src/bytes/base64-to-uint8-array.ts';

describe('bytes/base64ToUint8Array', () => {
  it('decodes Base64', () => {
    expect(base64ToUint8Array('SGVsbG8=')).toStrictEqual(new Uint8Array([72, 101, 108, 108, 111]));
    expect(base64ToUint8Array('')).toStrictEqual(new Uint8Array());
  });

  it('decodes Base64URL with or without padding', () => {
    expect(base64ToUint8Array('-_8')).toStrictEqual(new Uint8Array([251, 255]));
    expect(base64ToUint8Array('-_8=')).toStrictEqual(new Uint8Array([251, 255]));
  });

  it('throws on invalid input', () => {
    expect(() => base64ToUint8Array('@@@')).toThrow(DOMException);
  });
});
