import {formatQueryString} from '../../src/misc/format-query-string.ts';

describe('misc/formatQueryString', () => {
  it('converts an object into a query string', () => {
    expect(formatQueryString({page: 1, sort: 'name', active: true, big: 10n})).toBe(
      '?page=1&sort=name&active=true&big=10',
    );
  });

  it('gives one parameter per array element', () => {
    expect(formatQueryString({tags: ['a', 'b'], ids: [1, null, 2] as const})).toBe(
      '?tags=a&tags=b&ids=1&ids=2',
    );
  });

  it('leaves out null and undefined values', () => {
    expect(formatQueryString({a: null, b: undefined, c: 0, d: ''})).toBe('?c=0&d=');
  });

  it('returns an empty string when no parameters are left', () => {
    expect(formatQueryString({})).toBe('');
    expect(formatQueryString({a: undefined, b: [null]})).toBe('');
  });

  it('percent-encodes keys and values', () => {
    expect(formatQueryString({'a b': 'c+d&e=f', q: 'hello world'})).toBe(
      '?a%20b=c%2Bd%26e%3Df&q=hello%20world',
    );
  });

  it('encodes non-ASCII characters as UTF-8', () => {
    expect(formatQueryString({日本: '😀'})).toBe('?%E6%97%A5%E6%9C%AC=%F0%9F%98%80');
  });

  it('throws a URIError for an unpaired surrogate', () => {
    expect(() => formatQueryString({a: '\u{D800}'})).toThrow(URIError);
  });
});
