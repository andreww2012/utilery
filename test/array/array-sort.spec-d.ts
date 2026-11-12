import {arraySort} from '../../src/array/array-sort.ts';

describe('array/arraySort', () => {
  it('preserves the tuple length (slots widen to the element union)', () => {
    type ThreeOfOneTwoThree = [1 | 2 | 3, 1 | 2 | 3, 1 | 2 | 3];
    expectTypeOf(
      arraySort([3, 1, 2] as const, (a, b) => a - b),
    ).toEqualTypeOf<ThreeOfOneTwoThree>();
  });

  it('sorts a regular array to the same element array type', () => {
    expectTypeOf(arraySort([3, 1, 2], (a, b) => a - b)).toEqualTypeOf<number[]>();
  });
});
