import {endsWith} from '../../src/string/ends-with.ts';

describe('string/endsWith', () => {
  it('reports whether the string ends with the search value', () => {
    expect(endsWith('hello' as string, 'lo')).toBe(true);
    expect(endsWith('hello' as string, 'he')).toBe(false);
    expect(endsWith('你好世界' as string, '世界')).toBe(true);
    expect(endsWith('smile 😀' as string, '😀')).toBe(true);
    expect(endsWith('hello' as string, '' as string)).toBe(true);
  });

  it('checks up to the given end position', () => {
    expect(endsWith('hello' as string, 'el', 3)).toBe(true);
    expect(endsWith('hello' as string, 'lo', 3)).toBe(false);
  });
});
