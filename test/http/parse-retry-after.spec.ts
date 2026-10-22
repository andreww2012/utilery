import {parseRetryAfter} from '../../src/http/parse-retry-after.ts';

describe('http/parseRetryAfter', () => {
  it('parses a number of seconds', () => {
    expect(parseRetryAfter('120')).toBe(120_000);
    expect(parseRetryAfter(' 0 ')).toBe(0);
  });

  it('parses an HTTP date', () => {
    const now = Date.parse('Wed, 21 Oct 2026 07:27:00 GMT');

    expect(parseRetryAfter('Wed, 21 Oct 2026 07:28:00 GMT', now)).toBe(60_000);
    expect(parseRetryAfter('Wed, 21 Oct 2026 07:00:00 GMT', now)).toBe(0);
  });

  it('returns `undefined` for a missing or invalid header', () => {
    expect(parseRetryAfter(null)).toBeUndefined();
    expect(parseRetryAfter(undefined)).toBeUndefined();
    expect(parseRetryAfter('')).toBeUndefined();
    expect(parseRetryAfter('-5')).toBeUndefined();
    expect(parseRetryAfter('soon')).toBeUndefined();
  });
});
