import {stringSplit} from '../../src/string/string-split.ts';

describe('string/stringSplit', () => {
  it('basic test', () => {
    expect(stringSplit('a-b-c', '-')).toStrictEqual(['a', 'b', 'c']);
  });

  it('splits at a regular expression', () => {
    expect(stringSplit('a1b22c', /\d+/)).toStrictEqual(['a', 'b', 'c']);
  });

  it('returns at most `limit` parts', () => {
    expect(stringSplit('a-b-c', '-', 2)).toStrictEqual(['a', 'b']);
    expect(stringSplit('a-b-c', '-', 0)).toStrictEqual([]);
  });

  it('returns the whole string as the only part without a delimiter', () => {
    expect(stringSplit('a,b')).toStrictEqual(['a,b']);
    expect(stringSplit('a,b', undefined, 1)).toStrictEqual(['a,b']);
    expect(stringSplit('a,b', undefined, 0)).toStrictEqual([]);
  });
});
