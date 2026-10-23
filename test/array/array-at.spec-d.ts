import {arrayAt} from '../../src/array/array-at.ts';

const tuple = ['abc', 123, true] as const;

describe('array/arrayAt', () => {
  it('gives a precise type (no `undefined`) for an in-bounds literal index into a tuple', () => {
    expectTypeOf(arrayAt(tuple, 0)).toEqualTypeOf<'abc'>();
    expectTypeOf(arrayAt(tuple, 1)).toEqualTypeOf<123>();
    expectTypeOf(arrayAt(tuple, -1)).toEqualTypeOf<true>();
  });

  it('keeps `undefined` for an out-of-bounds literal index into a tuple', () => {
    expectTypeOf(arrayAt(tuple, 10)).toEqualTypeOf<'abc' | 123 | true | undefined>();
  });

  it('returns the element type with `undefined` for a regular array', () => {
    expectTypeOf(arrayAt(['a', 'b', 'c'], 0)).toEqualTypeOf<string | undefined>();
  });

  it('returns an array when given an array of indexes', () => {
    expectTypeOf(arrayAt(['a', 'b', 'c'], [0, 2])).toEqualTypeOf<(string | undefined)[]>();
  });
});
