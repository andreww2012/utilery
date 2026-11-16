import {arrayIntersection} from '../../src/array/array-intersection.ts';

describe('array/arrayIntersection', () => {
  const SIZES = ['s', 'm', 'l'] as const;
  type Size = (typeof SIZES)[number];

  it('takes the result type from the first array only', () => {
    expectTypeOf(arrayIntersection(SIZES, [] as string[])).toEqualTypeOf<Size[]>();
    expectTypeOf(arrayIntersection(SIZES, ['m', 'xl'])).toEqualTypeOf<Size[]>();
    expectTypeOf(arrayIntersection([1, 2], [] as unknown[])).toEqualTypeOf<number[]>();
    expectTypeOf(arrayIntersection([1, 'a'], [null, undefined])).toEqualTypeOf<
      (string | number)[]
    >();
    expectTypeOf(arrayIntersection([] as string[], SIZES)).toEqualTypeOf<string[]>();
  });

  it('accepts readonly arrays and tuples, and returns a mutable array', () => {
    expectTypeOf(
      arrayIntersection([1, 'a'] as readonly [number, string], [1] as const),
    ).toEqualTypeOf<(string | number)[]>();
  });

  it('keeps `any`, `unknown` and `never` element types', () => {
    // eslint-disable-next-line ts/no-explicit-any -- tests the `any` element type
    expectTypeOf(arrayIntersection([] as any[], [1])).toEqualTypeOf<any[]>();
    expectTypeOf(arrayIntersection([] as unknown[], [1])).toEqualTypeOf<unknown[]>();
    expectTypeOf(arrayIntersection([], [1])).toEqualTypeOf<never[]>();
    // eslint-disable-next-line ts/no-explicit-any -- tests the `any` element type
    expectTypeOf(arrayIntersection(SIZES, [] as any[])).toEqualTypeOf<Size[]>();
  });

  it('takes the result type from the first array with a comparator or a key function', () => {
    expectTypeOf(arrayIntersection([{id: 1}], [1], (x, y) => x.id === y)).toEqualTypeOf<
      {id: number}[]
    >();
    expectTypeOf(
      arrayIntersection([{id: 1}], [1], (item: {id: number} | number) =>
        typeof item === 'object' ? item.id : item,
      ),
    ).toEqualTypeOf<{id: number}[]>();
  });
});
