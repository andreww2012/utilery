import {arrayIsSubset} from '../../src/array/array-is-subset.ts';

describe('array/arrayIsSubset', () => {
  it('accepts arrays with different element types', () => {
    const SIZES = ['s', 'm', 'l'] as const;

    expectTypeOf(arrayIsSubset(SIZES, [] as string[])).toEqualTypeOf<boolean>();
    expectTypeOf(arrayIsSubset([] as string[], SIZES)).toEqualTypeOf<boolean>();
    expectTypeOf(arrayIsSubset([1, 2], ['a'])).toEqualTypeOf<boolean>();
    expectTypeOf(arrayIsSubset([1, 2], [] as unknown[])).toEqualTypeOf<boolean>();
    expectTypeOf(arrayIsSubset([1, 'a'] as readonly [number, string], [])).toEqualTypeOf<boolean>();
  });

  it('gives the comparator the element types of both arrays', () => {
    arrayIsSubset([{id: 1}], [1], (x, y) => {
      expectTypeOf(x).toEqualTypeOf<{id: number}>();
      expectTypeOf(y).toEqualTypeOf<number>();
      return x.id === y;
    });
  });

  it('accepts a key function for arrays with different element types', () => {
    expectTypeOf(
      arrayIsSubset([{id: 1}], [1], (item: {id: number} | number) =>
        typeof item === 'object' ? item.id : item,
      ),
    ).toEqualTypeOf<boolean>();
  });
});
