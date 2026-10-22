import {getPreferredEncoding} from '../../src/http/get-preferred-encoding.ts';

describe('http/getPreferredEncoding', () => {
  it('picks the encoding the client prefers', () => {
    expect(getPreferredEncoding('gzip;q=0.5, br;q=0.1', ['br', 'gzip'])).toBe('gzip');
    expect(getPreferredEncoding('br;q=0.9, gzip;q=1', ['br', 'gzip'])).toBe('gzip');
  });

  it("breaks ties in the server's order", () => {
    expect(getPreferredEncoding('gzip, deflate, br', ['br', 'gzip'])).toBe('br');
    expect(getPreferredEncoding('*', ['br', 'gzip'])).toBe('br');
  });

  it('respects refusals and falls back to `identity`', () => {
    expect(getPreferredEncoding('gzip;q=0, br', ['gzip'])).toBeUndefined();
    expect(getPreferredEncoding(undefined, ['br', 'identity'])).toBe('identity');
    expect(getPreferredEncoding('gzip, identity;q=0', ['br'])).toBeUndefined();
  });

  it('returns the most preferred encoding without a list', () => {
    expect(getPreferredEncoding('gzip, br;q=0.5')).toBe('gzip');
  });
});
