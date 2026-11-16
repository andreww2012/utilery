import {arrayIsEqualUnordered} from '../../src/array/array-is-equal-unordered.ts';

describe('array/arrayIsEqualUnordered', () => {
  it('accepts arrays with different element types, readonly arrays and tuples', () => {
    const SIZES = ['s', 'm', 'l'] as const;

    expectTypeOf(arrayIsEqualUnordered(SIZES, [] as string[])).toEqualTypeOf<boolean>();
    expectTypeOf(arrayIsEqualUnordered([] as string[], SIZES)).toEqualTypeOf<boolean>();
    expectTypeOf(arrayIsEqualUnordered([1, 2], ['a'])).toEqualTypeOf<boolean>();
    expectTypeOf(arrayIsEqualUnordered([1, 2], [] as unknown[])).toEqualTypeOf<boolean>();
    // eslint-disable-next-line ts/no-explicit-any -- tests the `any` element type
    expectTypeOf(arrayIsEqualUnordered([] as any[], [])).toEqualTypeOf<boolean>();
    expectTypeOf(
      arrayIsEqualUnordered([1, 'a'] as readonly [number, string], [] as readonly never[]),
    ).toEqualTypeOf<boolean>();
  });

  it('gives the comparator the element types of both arrays', () => {
    arrayIsEqualUnordered([{id: 1}], [1] as const, (x, y) => {
      expectTypeOf(x).toEqualTypeOf<{id: number}>();
      expectTypeOf(y).toEqualTypeOf<1>();
      return x.id === y;
    });
  });

  it('gives the key function the element type of arrays of the same type', () => {
    arrayIsEqualUnordered([{id: 1}], [{id: 2}], (item) => {
      expectTypeOf(item).toEqualTypeOf<{id: number}>();
      return item.id;
    });
  });

  it('accepts a key function for arrays with different element types', () => {
    expectTypeOf(
      arrayIsEqualUnordered([{id: 1}], [1], (item: {id: number} | number) =>
        typeof item === 'object' ? item.id : item,
      ),
    ).toEqualTypeOf<boolean>();
  });
});
