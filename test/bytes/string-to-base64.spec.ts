// cspell:ignore Привет
import {stringToBase64} from '../../src/bytes/string-to-base64.ts';
import {describeWithAndWithoutNative} from '../describe-with-and-without-native.ts';
import {toBase64StandIn} from './native-stand-ins.ts';

describe('bytes/stringToBase64', () => {
  describeWithAndWithoutNative(Uint8Array.prototype, 'toBase64', toBase64StandIn, () => {
    it('encodes the UTF-8 bytes of a string', () => {
      expect(stringToBase64('Hello')).toBe('SGVsbG8=');
      expect(stringToBase64('Привет')).toBe('0J/RgNC40LLQtdGC');
      expect(stringToBase64('你好')).toBe('5L2g5aW9');
      expect(stringToBase64('😀')).toBe('8J+YgA==');
    });

    it('uses the Base64URL alphabet without padding with `urlSafe`', () => {
      expect(stringToBase64('Привет', {urlSafe: true})).toBe('0J_RgNC40LLQtdGC');
      expect(stringToBase64('😀', {urlSafe: true})).toBe('8J-YgA');
    });
  });
});
