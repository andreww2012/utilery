import {arrayDropFirstBy} from '../../src/array/array-drop-first-by.ts';

const ascendingSorting = (a: number, b: number) => a - b;

describe('array/arrayDropFirstBy', () => {
  it('drops the n smallest elements, keeping the rest (order unspecified)', () => {
    expect(
      // eslint-disable-next-line unicorn/no-array-sort -- own the array, sort in place
      arrayDropFirstBy([3, 1, 4, 1, 5], 2, (value) => value).sort(ascendingSorting),
    ).toStrictEqual([3, 4, 5]);
  });

  it('drops the n largest with a descending rule (order unspecified)', () => {
    expect(
      // eslint-disable-next-line unicorn/no-array-sort -- own the array, sort in place
      arrayDropFirstBy([3, 1, 4, 1, 5], 2, [(value) => value, 'desc']).sort(ascendingSorting),
    ).toStrictEqual([1, 1, 3]);
  });

  it('keeps `null` and `undefined` elements that are not among the dropped ones', () => {
    const result = arrayDropFirstBy([null, undefined, 5, 1, 7], 2, (value) => value ?? 10);

    expect(result).toHaveLength(3);
    expect(new Set(result)).toStrictEqual(new Set([null, undefined, 7]));
  });

  it('does not mutate the input', () => {
    const source = [3, 1, 2];
    arrayDropFirstBy(source, 2, (value) => value);

    expect(source).toStrictEqual([3, 1, 2]);
  });
});
