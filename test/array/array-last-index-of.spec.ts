import {arrayLastIndexOf} from '../../src/array/array-last-index-of.ts';

describe('array/arrayLastIndexOf', () => {
  it('returns the index of the last occurrence', () => {
    expect(arrayLastIndexOf(['a', 'b', 'a'], 'a')).toBe(2);
    expect(arrayLastIndexOf(['a', 'b', 'a'], 'b')).toBe(1);
    expect(arrayLastIndexOf(['你好', '😀', '你好'], '你好')).toBe(2);
  });

  it('returns `-1` when the array does not have the value', () => {
    const value: unknown = 1;

    expect(arrayLastIndexOf(['a', 'b'], 'c')).toBe(-1);
    expect(arrayLastIndexOf(['a', 'b'], value)).toBe(-1);
    expect(arrayLastIndexOf([], 'a')).toBe(-1);
  });

  it('starts the backward search at `fromIndex`', () => {
    expect(arrayLastIndexOf(['a', 'b', 'a'], 'a', 1)).toBe(0);
    expect(arrayLastIndexOf(['a', 'b', 'a'], 'a', -2)).toBe(0);
    expect(arrayLastIndexOf(['a', 'b', 'a'], 'b', 0)).toBe(-1);
  });

  it('counts an explicit `undefined` `fromIndex` as `0`', () => {
    expect(arrayLastIndexOf(['a', 'b', 'a'], 'a', undefined)).toBe(0);
    expect(arrayLastIndexOf(['a', 'b', 'a'], 'b', undefined)).toBe(-1);
  });

  it('compares with `===`', () => {
    expect(arrayLastIndexOf([Number.NaN], Number.NaN)).toBe(-1);
    expect(arrayLastIndexOf([0], -0)).toBe(0);
    expect(arrayLastIndexOf([{}], {})).toBe(-1);
  });
});
