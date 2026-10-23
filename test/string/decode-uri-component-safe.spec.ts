import {decodeUriComponentSafe} from '../../src/string/decode-uri-component-safe.ts';

describe('string/decodeUriComponentSafe', () => {
  it('decodes valid sequences', () => {
    expect(decodeUriComponentSafe('st%C3%A5le')).toBe('ståle'); // cspell:disable-line
    expect(decodeUriComponentSafe('a%20b%2Fc')).toBe('a b/c');
  });

  it('keeps malformed sequences instead of throwing', () => {
    expect(decodeUriComponentSafe('100%')).toBe('100%');
    expect(decodeUriComponentSafe('%E0%A4%A ok %C3%A5')).toBe('%E0%A4%A ok å');
    expect(decodeUriComponentSafe('%ZZ%41')).toBe('%ZZA');
  });
});
