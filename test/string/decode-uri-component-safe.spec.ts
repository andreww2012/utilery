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

  it('turns a cut-off `%C2` and byte order marks into replacement characters', () => {
    expect(decodeUriComponentSafe('%C2')).toBe('�');
    expect(decodeUriComponentSafe('%C2a%C2%C3%A5')).toBe('�a�å');
    expect(decodeUriComponentSafe('a%FE%FFb%FF%FE')).toBe('a��b��');
  });

  it('ignores the case of hex digits in a cut-off `%C2` and byte order marks', () => {
    expect(decodeUriComponentSafe('%c2 %c2a')).toBe('� �a');
    expect(decodeUriComponentSafe('%fe%ff %ff%fe')).toBe('�� ��');
    expect(decodeUriComponentSafe('%Fe%fF%FE%ff')).toBe('����');
  });

  it('decodes every sequence exactly once when some are malformed', () => {
    expect(decodeUriComponentSafe('%25C2%zz')).toBe('%C2%zz');
    expect(decodeUriComponentSafe('%41%E0 %41%E0%41')).toBe('A%E0 A%E0A');
    expect(decodeUriComponentSafe('%E6%97%A5%E0 %E6%97%A5%E0%E6%97%A5')).toBe('日%E0 日%E0日');
  });

  it('keeps `$` in decoded text as is when some sequences are malformed', () => {
    expect(decodeUriComponentSafe('%24%26%E0')).toBe('$&%E0');
    expect(decodeUriComponentSafe('%24%60%zz')).toBe('$`%zz');
  });
});
