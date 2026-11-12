import {stringIncludes} from '../../src/string/string-includes.ts';

describe('string/stringIncludes', () => {
  it('reports whether the string contains the search value', () => {
    expect(stringIncludes('hello' as string, 'ell')).toBe(true);
    expect(stringIncludes('hello' as string, 'xyz')).toBe(false);
    expect(stringIncludes('你好世界' as string, '好世')).toBe(true);
    expect(stringIncludes('a 😀 smile' as string, '😀')).toBe(true);
    expect(stringIncludes('hello' as string, '' as string)).toBe(true);
  });

  it('searches from the given position', () => {
    expect(stringIncludes('hello' as string, 'll', 2)).toBe(true);
    expect(stringIncludes('hello' as string, 'he', 1)).toBe(false);
  });
});
