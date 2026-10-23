import {uint8ArrayToBase64} from '../../src/bytes/uint8-array-to-base64.ts';
import {describeWithAndWithoutNative} from '../describe-with-and-without-native.ts';
import {toBase64StandIn} from './native-stand-ins.ts';

describe('bytes/uint8ArrayToBase64', () => {
  describeWithAndWithoutNative(Uint8Array.prototype, 'toBase64', toBase64StandIn, () => {
    it('encodes bytes as Base64', () => {
      expect(uint8ArrayToBase64(new Uint8Array([72, 101, 108, 108, 111]))).toBe('SGVsbG8=');
      expect(uint8ArrayToBase64(new Uint8Array())).toBe('');
    });

    it('accepts an `ArrayBuffer`', () => {
      expect(uint8ArrayToBase64(new Uint8Array([251, 255]).buffer)).toBe('+/8=');
    });

    it('encodes only the bytes of a view', () => {
      const bytes = new Uint8Array([0, 251, 255, 0]);

      expect(uint8ArrayToBase64(bytes.subarray(1, 3))).toBe('+/8=');
      expect(uint8ArrayToBase64(Buffer.from('Hi'))).toBe('SGk=');
    });

    it('uses the Base64URL alphabet without padding with `urlSafe`', () => {
      expect(uint8ArrayToBase64(new Uint8Array([251, 255]), {urlSafe: true})).toBe('-_8');
      expect(uint8ArrayToBase64(new Uint8Array([251, 255]), {})).toBe('+/8=');
    });

    it('encodes large arrays', () => {
      const bytes = new Uint8Array(100_000).fill(65);

      expect(uint8ArrayToBase64(bytes)).toBe(`${'QUFB'.repeat(33_333)}QQ==`); // cspell:disable-line
    });
  });
});
