import {jsonStringifyForHtml} from '../../src/json/json-stringify-for-html.ts';

describe('json/jsonStringifyForHtml', () => {
  it('escapes characters that could end a script tag', () => {
    expect(jsonStringifyForHtml({comment: '</script><script>alert(1)</script>'})).toBe(
      String.raw`{"comment":"\u003c/script\u003e\u003cscript\u003ealert(1)\u003c/script\u003e"}`,
    );
    expect(jsonStringifyForHtml('a & b')).toBe(String.raw`"a \u0026 b"`);
    expect(jsonStringifyForHtml('\u{2028}\u{2029}')).toBe(String.raw`"\u2028\u2029"`);
  });

  it('gives JSON that parses to the same value', () => {
    const value = {html: '<b>&amp;</b>', list: [1, null, true], nested: {line: 'a\u{2028}b'}};

    expect(JSON.parse(jsonStringifyForHtml(value))).toStrictEqual(value);
  });

  it('throws for values without a JSON form', () => {
    expect(() => jsonStringifyForHtml(undefined)).toThrow(TypeError);
  });
});
