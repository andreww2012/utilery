import {base64ToUint8Array} from '../../src/bytes/base64-to-uint8-array.ts';
import {describeWithAndWithoutNative} from '../describe-with-and-without-native.ts';
import {fromBase64StandIn} from './native-stand-ins.ts';

const HELLO = new Uint8Array([72, 101, 108, 108, 111]);

describe('bytes/base64ToUint8Array', () => {
  describeWithAndWithoutNative(Uint8Array, 'fromBase64', fromBase64StandIn, () => {
    it('decodes Base64', () => {
      expect(base64ToUint8Array('SGVsbG8=')).toStrictEqual(HELLO);
      expect(base64ToUint8Array('')).toStrictEqual(new Uint8Array());
    });

    it('decodes Base64 with or without padding', () => {
      expect(base64ToUint8Array('SGVsbG8')).toStrictEqual(HELLO);
      expect(base64ToUint8Array('SGVsbA==')).toStrictEqual(new Uint8Array([72, 101, 108, 108]));
      expect(base64ToUint8Array('SGVsbA')).toStrictEqual(new Uint8Array([72, 101, 108, 108]));
    });

    it('decodes Base64URL with or without padding', () => {
      expect(base64ToUint8Array('-_8')).toStrictEqual(new Uint8Array([251, 255]));
      expect(base64ToUint8Array('-_8=')).toStrictEqual(new Uint8Array([251, 255]));
    });

    it('ignores ASCII whitespace', () => {
      expect(base64ToUint8Array('SGVs bG8=')).toStrictEqual(HELLO);
      expect(base64ToUint8Array('SG Vs bG8')).toStrictEqual(HELLO);
      expect(base64ToUint8Array(' S\tG\nV\fs\rbG8= ')).toStrictEqual(HELLO);
    });

    it('throws a `SyntaxError` on invalid input', () => {
      ['@@@', 'A', 'SGVsbA=', 'SGk===', 'SGk=SGk=', '=', '\u{A0}SGk=', 'SGkÿ', 'SGk😀'].forEach(
        (base64) => {
          expect(() => base64ToUint8Array(base64)).toThrow(SyntaxError);
        },
      );
    });
  });
});
