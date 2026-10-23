import {arrayFilter} from '../../src/array/array-filter.ts';

describe('array/arrayFilter', () => {
  it('keeps the elements that pass the predicate', () => {
    expect(arrayFilter([1, 2, 3], (value) => value !== 2)).toStrictEqual([1, 3]);
  });

  it('narrows by a type guard', () => {
    expect(arrayFilter([1, 'a', 2], (value) => typeof value === 'number')).toStrictEqual([1, 2]);
  });

  it('does not mutate the input', () => {
    const source = [1, 2, 3];
    arrayFilter(source, (value) => value > 1);

    expect(source).toStrictEqual([1, 2, 3]);
  });
});
