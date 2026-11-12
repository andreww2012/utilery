import {arrayLastIndexOf} from '../../src/array/array-last-index-of.ts';

const LEVELS = ['debug', 'info', 'warn'] as const;

describe('array/arrayLastIndexOf', () => {
  it('returns a `number`', () => {
    expectTypeOf(arrayLastIndexOf(['a', 'b'], 'a')).toEqualTypeOf<number>();
    expectTypeOf(arrayLastIndexOf(LEVELS, 'info', 1)).toEqualTypeOf<number>();
  });

  it('accepts a value of a type wider than the element type', () => {
    expectTypeOf(arrayLastIndexOf(LEVELS, 'info' as string)).toEqualTypeOf<number>();
    expectTypeOf(arrayLastIndexOf(LEVELS, 'info' as unknown)).toEqualTypeOf<number>();
    expectTypeOf(arrayLastIndexOf(LEVELS, 'info' as string | undefined)).toEqualTypeOf<number>();
    expectTypeOf(
      arrayLastIndexOf([] as readonly string[], 1 as string | number),
    ).toEqualTypeOf<number>();
  });

  it('rejects a value of an unrelated type', () => {
    // @ts-expect-error a number is never in an array of strings
    arrayLastIndexOf(['a', 'b'], 1);
    // @ts-expect-error a number is never in an array of string literals
    arrayLastIndexOf(LEVELS, 1);
  });
});
