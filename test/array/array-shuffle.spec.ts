import {arrayShuffle} from '../../src/array/array-shuffle.ts';
import {createSeededRandom} from '../../src/math/create-seeded-random.ts';

describe('array/arrayShuffle', () => {
  it('returns a shuffled copy', () => {
    const array = [1, 2, 3, 4, 5];
    const shuffled = arrayShuffle(array);

    expect(shuffled.toSorted()).toStrictEqual([1, 2, 3, 4, 5]);
    expect(shuffled).not.toBe(array);
    expect(array).toStrictEqual([1, 2, 3, 4, 5]);
  });

  it('gives the same order for the same seeded generator', () => {
    const array = Array.from({length: 20}, (_, index) => index);

    expect(arrayShuffle(array, {random: createSeededRandom('x')})).toStrictEqual(
      arrayShuffle(array, {random: createSeededRandom('x')}),
    );
    expect(arrayShuffle(array, {random: createSeededRandom('x')})).not.toStrictEqual(array);
  });

  it('uses the generator', () => {
    expect(arrayShuffle([1, 2, 3], {random: () => 0})).toStrictEqual([2, 3, 1]);
    expect(arrayShuffle([], {random: () => 0})).toStrictEqual([]);
  });
});
