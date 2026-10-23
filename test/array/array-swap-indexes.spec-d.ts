import {arraySwapIndexes} from '../../src/array/array-swap-indexes.ts';

describe('array/arraySwapIndexes', () => {
  it('swaps the element types at the two literal indexes of a tuple', () => {
    expectTypeOf(arraySwapIndexes(['a', 1, true] as const, 0, 2)).toEqualTypeOf<[true, 1, 'a']>();
  });

  it('falls back to an element array for a regular array', () => {
    expectTypeOf(arraySwapIndexes([1, 2, 3], 0, 2)).toEqualTypeOf<number[]>();
  });
});
