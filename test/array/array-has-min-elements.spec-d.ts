import {arrayHasMinElements} from '../../src/array/array-has-min-elements.ts';

describe('array/arrayHasMinElements', () => {
  it('narrows a regular array to a known-minimum tuple for a literal minimum', () => {
    const values: number[] = [1, 2, 3];

    if (arrayHasMinElements(values, 2)) {
      expectTypeOf(values).toEqualTypeOf<[number, number, ...number[]]>();
    }
  });

  it('returns a plain boolean for a non-literal minimum', () => {
    const minimum = Math.min(2, 3); // non-literal `number`

    expectTypeOf(arrayHasMinElements([1, 2, 3], minimum)).toEqualTypeOf<boolean>();
  });

  it('returns a plain boolean for a minimum that is not a single non-negative integer', () => {
    const pair = ['a', 'b'] as [string, ...string[]];
    const minimum = 3 as 1 | 3;

    expectTypeOf(arrayHasMinElements(pair, minimum)).toEqualTypeOf<boolean>();
    if (!arrayHasMinElements(pair, minimum)) {
      expectTypeOf(pair).toEqualTypeOf<[string, ...string[]]>();
    }

    expectTypeOf(arrayHasMinElements(pair, 1.5)).toEqualTypeOf<boolean>();
    expectTypeOf(arrayHasMinElements(pair, -1)).toEqualTypeOf<boolean>();
  });
});
