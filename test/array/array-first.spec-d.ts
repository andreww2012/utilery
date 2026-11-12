import {arrayFirst} from '../../src/array/array-first.ts';

describe('array/arrayFirst', () => {
  it('gives the first element type of a non-empty tuple', () => {
    expectTypeOf(arrayFirst(['abc', 123, true] as const)).toEqualTypeOf<'abc'>();
    expectTypeOf(arrayFirst(['a', 1] as [string, ...number[]])).toEqualTypeOf<string>();
  });

  it('gives no `undefined` for a tuple that ends with a required element', () => {
    expectTypeOf(arrayFirst([1] as [...string[], number])).toEqualTypeOf<string | number>();
  });

  it('adds `undefined` for an array that may be empty', () => {
    expectTypeOf(arrayFirst([] as string[])).toEqualTypeOf<string | undefined>();
    expectTypeOf(arrayFirst([] as readonly string[])).toEqualTypeOf<string | undefined>();
    expectTypeOf(arrayFirst([] as [string?])).toEqualTypeOf<string | undefined>();
  });
});
