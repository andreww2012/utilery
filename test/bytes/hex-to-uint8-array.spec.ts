import {hexToUint8Array} from '../../src/bytes/hex-to-uint8-array.ts';
import {describeWithAndWithoutNative} from '../describe-with-and-without-native.ts';
import {fromHexStandIn} from './native-stand-ins.ts';

describe('bytes/hexToUint8Array', () => {
  describeWithAndWithoutNative(Uint8Array, 'fromHex', fromHexStandIn, () => {
    it('decodes lowercase and uppercase hex', () => {
      expect(hexToUint8Array('48656c6c6f')).toStrictEqual(new Uint8Array([72, 101, 108, 108, 111]));
      expect(hexToUint8Array('FF00')).toStrictEqual(new Uint8Array([255, 0]));
      expect(hexToUint8Array('fF0a')).toStrictEqual(new Uint8Array([255, 10]));
      expect(hexToUint8Array('')).toStrictEqual(new Uint8Array());
    });

    it('throws a `SyntaxError` on an odd length or a non-hex character', () => {
      ['abc', 'zz', ' ff', 'ff\n', '０٠'].forEach((hex) => {
        expect(() => hexToUint8Array(hex)).toThrow(SyntaxError);
      });
    });
  });
});
