// cspell:ignore chstes nächstes
import {parseLinkHeader} from '../../src/http/parse-link-header.ts';
import {expectOwnProtoKey} from '../own-proto-key.ts';

describe('http/parseLinkHeader', () => {
  it('parses links', () => {
    expect(
      parseLinkHeader(
        '<https://api.example.com/items?page=2>; rel="next", <https://api.example.com/items?page=5>; rel="last"',
      ),
    ).toStrictEqual([
      {uri: 'https://api.example.com/items?page=2', rel: 'next'},
      {uri: 'https://api.example.com/items?page=5', rel: 'last'},
    ]);
  });

  it('splits several relations and keeps parameters', () => {
    expect(
      parseLinkHeader('</a>; rel="prev first"; title="Hi, there"; type=text/html'),
    ).toStrictEqual([
      {uri: '/a', rel: 'prev', title: 'Hi, there', type: 'text/html'},
      {uri: '/a', rel: 'first', title: 'Hi, there', type: 'text/html'},
    ]);
  });

  it('returns an empty array for a missing or invalid header', () => {
    expect(parseLinkHeader(null)).toStrictEqual([]);
    expect(parseLinkHeader('')).toStrictEqual([]);
    expect(parseLinkHeader('garbage')).toStrictEqual([]);
  });

  it('keeps links without a relation and decodes extended parameters', () => {
    expect(parseLinkHeader('<a>')).toStrictEqual([{uri: 'a'}]);
    expect(parseLinkHeader("<a>; rel=next; title*=UTF-8'de'n%c3%a4chstes")).toStrictEqual([
      {uri: 'a', rel: 'next', 'title*': {language: 'de', encoding: null, value: 'nächstes'}},
    ]);
  });

  it('keeps parameters named like Object.prototype properties as own values', () => {
    const [link] = parseLinkHeader('<https://example.com>; __proto__="a"; constructor=b');

    expectOwnProtoKey(link, 'a');

    expect(Object.getOwnPropertyDescriptor(link, 'constructor')?.value).toBe('b');

    parseLinkHeader('<https://example.com>; rel="next prev"; __proto__="a"; __proto__="b"').forEach(
      (entry) => {
        expectOwnProtoKey(entry, ['a', 'b']);
      },
    );
  });
});
