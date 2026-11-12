import {arrayConcat} from '../../src/array/array-concat.ts';

describe('array/arrayConcat', () => {
  it('keeps the shape of a single tuple, as a mutable copy', () => {
    expectTypeOf(arrayConcat(['x', 1] as const)).toEqualTypeOf<['x', 1]>();
    expectTypeOf(arrayConcat([] as string[])).toEqualTypeOf<string[]>();
    expectTypeOf(arrayConcat([] as readonly string[])).toEqualTypeOf<string[]>();
  });

  it('gives an array of the elements of all the arrays', () => {
    expectTypeOf(arrayConcat(['a', 'b'], [1, 2])).toEqualTypeOf<(string | number)[]>();
    expectTypeOf(arrayConcat(['x'] as const, [1] as const)).toEqualTypeOf<('x' | 1)[]>();
    expectTypeOf(arrayConcat([], ['hello'])).toEqualTypeOf<string[]>();
  });

  it('includes the elements of arrays passed as a spread of unknown length', () => {
    const rest = [['a'], ['b']] as string[][];

    expectTypeOf(arrayConcat([1], ...rest)).toEqualTypeOf<(number | string)[]>();
  });

  it('adds primitives as elements', () => {
    expectTypeOf(arrayConcat(['a'], 1 as number, [true], null)).toEqualTypeOf<
      (string | number | boolean | null)[]
    >();
    expectTypeOf(arrayConcat(['a'], 1)).toEqualTypeOf<(string | 1)[]>();
  });

  it('rejects objects after the first array', () => {
    // @ts-expect-error an object may be spread or added as is
    arrayConcat(['a'], {length: 0});
  });
});
