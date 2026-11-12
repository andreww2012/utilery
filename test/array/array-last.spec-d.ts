import {arrayLast} from '../../src/array/array-last.ts';

describe('array/arrayLast', () => {
  it('gives the last element type of a tuple that ends with a required element', () => {
    expectTypeOf(arrayLast(['abc', 123, true] as const)).toEqualTypeOf<true>();
    expectTypeOf(arrayLast([1] as [...string[], number])).toEqualTypeOf<number>();
  });

  it('gives no `undefined` for a tuple that starts with a required element', () => {
    expectTypeOf(arrayLast(['a'] as [string, ...number[]])).toEqualTypeOf<string | number>();
  });

  it('adds `undefined` for an array that may be empty', () => {
    expectTypeOf(arrayLast([] as string[])).toEqualTypeOf<string | undefined>();
    expectTypeOf(arrayLast([] as readonly string[])).toEqualTypeOf<string | undefined>();
    expectTypeOf(arrayLast([] as [string?])).toEqualTypeOf<string | undefined>();
  });
});
