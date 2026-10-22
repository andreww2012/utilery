import {hexToUint8Array} from '../../src/bytes/hex-to-uint8-array.ts';

describe('bytes/hexToUint8Array', () => {
  it('decodes lowercase and uppercase hex', () => {
    expect(hexToUint8Array('48656c6c6f')).toStrictEqual(new Uint8Array([72, 101, 108, 108, 111]));
    expect(hexToUint8Array('FF00')).toStrictEqual(new Uint8Array([255, 0]));
    expect(hexToUint8Array('')).toStrictEqual(new Uint8Array());
  });

  it('throws on an odd length or a non-hex character', () => {
    expect(() => hexToUint8Array('abc')).toThrow(Error);
    expect(() => hexToUint8Array('zz')).toThrow(Error);
  });
});
