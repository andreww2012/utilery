import {arraySwapIndexes} from '../../src/array/array-swap-indexes.ts';

describe('array/arraySwapIndexes', () => {
  it('swaps the elements at the two indexes', () => {
    expect(arraySwapIndexes([1, 2, 3, 4], 0, 2)).toStrictEqual([3, 2, 1, 4]);
  });

  it('counts negative indexes from the end', () => {
    expect(arraySwapIndexes([1, 2, 3, 4], 0, -1)).toStrictEqual([4, 2, 3, 1]);
  });

  it('leaves the copy unchanged for an out-of-bounds index', () => {
    expect(arraySwapIndexes([1, 2, 3], 0, 10)).toStrictEqual([1, 2, 3]);
  });

  it('leaves the copy unchanged for a NaN index', () => {
    expect(arraySwapIndexes([1, 2, 3], 0, Number.NaN)).toStrictEqual([1, 2, 3]);
  });

  it('does not mutate the input', () => {
    const source = [1, 2, 3];
    const result = arraySwapIndexes(source, 0, 2);

    expect(result).not.toBe(source);
    expect(source).toStrictEqual([1, 2, 3]);
  });
});
