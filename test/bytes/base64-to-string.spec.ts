import {base64ToString} from '../../src/bytes/base64-to-string.ts';
import {describeWithAndWithoutNative} from '../describe-with-and-without-native.ts';
import {fromBase64StandIn} from './native-stand-ins.ts';

describe('bytes/base64ToString', () => {
  describeWithAndWithoutNative(Uint8Array, 'fromBase64', fromBase64StandIn, () => {
    it('decodes Base64 as UTF-8 text', () => {
      expect(base64ToString('SGVsbG8=')).toBe('Hello');
      expect(base64ToString('0J/RgNC40LLQtdGC')).toBe('Привет'); // cspell:disable-line
      expect(base64ToString('5L2g5aW9')).toBe('你好');
    });

    it('decodes Base64URL with or without padding', () => {
      expect(base64ToString('8J-YgA')).toBe('😀');
      expect(base64ToString('8J-YgA==')).toBe('😀');
    });

    it('throws a `SyntaxError` on invalid input', () => {
      expect(() => base64ToString('@@@')).toThrow(SyntaxError);
    });
  });
});
