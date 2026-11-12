import {arrayIndexOf} from '../../src/array/array-index-of.ts';

describe('array/arrayIndexOf', () => {
  it('returns the index of the first occurrence', () => {
    expect(arrayIndexOf(['a', 'b', 'a'], 'a')).toBe(0);
    expect(arrayIndexOf(['a', 'b', 'a'], 'b')).toBe(1);
    expect(arrayIndexOf(['😀', '你好'], '你好')).toBe(1);
  });

  it('returns `-1` when the array does not have the value', () => {
    const value: unknown = 1;

    expect(arrayIndexOf(['a', 'b'], 'c')).toBe(-1);
    expect(arrayIndexOf(['a', 'b'], value)).toBe(-1);
    expect(arrayIndexOf([], 'a')).toBe(-1);
  });

  it('starts the search at `fromIndex`', () => {
    expect(arrayIndexOf(['a', 'b', 'a'], 'a', 1)).toBe(2);
    expect(arrayIndexOf(['a', 'b', 'a'], 'a', -1)).toBe(2);
    expect(arrayIndexOf(['a', 'b', 'a'], 'a', 3)).toBe(-1);
    expect(arrayIndexOf(['a', 'b', 'a'], 'a', undefined)).toBe(0);
  });

  it('compares with `===`', () => {
    expect(arrayIndexOf([Number.NaN], Number.NaN)).toBe(-1);
    expect(arrayIndexOf([0], -0)).toBe(0);
    expect(arrayIndexOf([{}], {})).toBe(-1);
  });
});
