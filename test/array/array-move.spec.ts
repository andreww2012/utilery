import {arrayMove} from '../../src/array/array-move.ts';

describe('array/arrayMove', () => {
  it('basic test', () => {
    expect(arrayMove([1, 2, 3], 0, 2)).toStrictEqual([2, 3, 1]);
  });

  it('counts a negative `to` from the end of the array without the moved element', () => {
    expect(arrayMove(['a', 'b', 'c', 'd'], 0, -1)).toStrictEqual(['b', 'c', 'a', 'd']);
    expect(arrayMove(['a', 'b', 'c', 'd'], 0, 3)).toStrictEqual(['b', 'c', 'd', 'a']);
  });
});
