import {uint8ArrayToHex} from '../../src/bytes/uint8-array-to-hex.ts';

describe('bytes/uint8ArrayToHex', () => {
  it('encodes bytes as lowercase hex', () => {
    expect(uint8ArrayToHex(new Uint8Array([72, 101, 108, 108, 111]))).toBe('48656c6c6f');
    expect(uint8ArrayToHex(new Uint8Array([0, 15, 255]))).toBe('000fff');
    expect(uint8ArrayToHex(new Uint8Array())).toBe('');
  });

  it('accepts an `ArrayBuffer`', () => {
    expect(uint8ArrayToHex(new Uint8Array([171, 205]).buffer)).toBe('abcd');
  });
});
