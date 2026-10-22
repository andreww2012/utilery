// cspell:ignore FFFD
import {uint8ArrayToString} from '../../src/bytes/uint8-array-to-string.ts';

describe('bytes/uint8ArrayToString', () => {
  it('decodes UTF-8 by default', () => {
    expect(uint8ArrayToString(new Uint8Array([72, 101, 108, 108, 111]))).toBe('Hello');
    expect(uint8ArrayToString(new Uint8Array([226, 130, 172]).buffer)).toBe('€');
  });

  it('replaces invalid sequences instead of throwing', () => {
    expect(uint8ArrayToString(new Uint8Array([255]))).toBe('\u{FFFD}');
  });

  it('decodes other encodings', () => {
    expect(uint8ArrayToString(new Uint8Array([167, 65, 166, 110]), 'big5')).toBe('你好');
    expect(uint8ArrayToString(new Uint8Array([233]), 'latin1')).toBe('é');
  });
});
