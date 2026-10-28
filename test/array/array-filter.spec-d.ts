import {arrayFilter} from '../../src/array/array-filter.ts';

describe('array/arrayFilter', () => {
  it('narrows a tuple to a refined tuple via an inferred type guard', () => {
    const tuple: [1, 2, 3] = [1, 2, 3];
    expectTypeOf(arrayFilter(tuple, (value) => value !== 2)).toEqualTypeOf<[1, 3]>();
  });

  it('narrows a union array to the guarded element type', () => {
    const values: (number | string)[] = [1, 'a', 2];
    expectTypeOf(arrayFilter(values, (value) => typeof value === 'number')).toEqualTypeOf<
      number[]
    >();
  });
});
