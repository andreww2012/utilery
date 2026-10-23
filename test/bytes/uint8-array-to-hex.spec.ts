import {uint8ArrayToHex} from '../../src/bytes/uint8-array-to-hex.ts';
import {describeWithAndWithoutNative} from '../describe-with-and-without-native.ts';
import {toHexStandIn} from './native-stand-ins.ts';

describe('bytes/uint8ArrayToHex', () => {
  describeWithAndWithoutNative(Uint8Array.prototype, 'toHex', toHexStandIn, () => {
    it('encodes bytes as lowercase hex', () => {
      expect(uint8ArrayToHex(new Uint8Array([72, 101, 108, 108, 111]))).toBe('48656c6c6f');
      expect(uint8ArrayToHex(new Uint8Array([0, 15, 255]))).toBe('000fff');
      expect(uint8ArrayToHex(new Uint8Array())).toBe('');
    });

    it('accepts an `ArrayBuffer`', () => {
      expect(uint8ArrayToHex(new Uint8Array([171, 205]).buffer)).toBe('abcd');
    });

    it('encodes only the bytes of a view', () => {
      expect(uint8ArrayToHex(new Uint8Array([1, 171, 205, 2]).subarray(1, 3))).toBe('abcd');
    });
  });
});
