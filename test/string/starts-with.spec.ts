import {startsWith} from '../../src/string/starts-with.ts';

describe('string/startsWith', () => {
  it('reports whether the string starts with the search value', () => {
    expect(startsWith('hello' as string, 'he')).toBe(true);
    expect(startsWith('hello' as string, 'lo')).toBe(false);
    expect(startsWith('你好世界' as string, '你好')).toBe(true);
    expect(startsWith('😀 smile' as string, '😀')).toBe(true);
    expect(startsWith('hello' as string, '' as string)).toBe(true);
  });

  it('checks from the given position', () => {
    expect(startsWith('hello' as string, 'll', 2)).toBe(true);
    expect(startsWith('hello' as string, 'he', 1)).toBe(false);
  });
});
