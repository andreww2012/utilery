// cspell:ignore Привет
import {base64ToString} from '../../src/bytes/base64-to-string.ts';

describe('bytes/base64ToString', () => {
  it('decodes Base64 as UTF-8 text', () => {
    expect(base64ToString('SGVsbG8=')).toBe('Hello');
    expect(base64ToString('0J/RgNC40LLQtdGC')).toBe('Привет');
  });

  it('decodes Base64URL with or without padding', () => {
    expect(base64ToString('8J-YgA')).toBe('😀');
    expect(base64ToString('8J-YgA==')).toBe('😀');
  });

  it('throws on invalid input', () => {
    expect(() => base64ToString('@@@')).toThrow(DOMException);
  });
});
