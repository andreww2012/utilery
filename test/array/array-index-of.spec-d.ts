import {arrayIndexOf} from '../../src/array/array-index-of.ts';

const LEVELS = ['debug', 'info', 'warn'] as const;

describe('array/arrayIndexOf', () => {
  it('returns a `number`', () => {
    expectTypeOf(arrayIndexOf(['a', 'b'], 'a')).toEqualTypeOf<number>();
    expectTypeOf(arrayIndexOf(LEVELS, 'info', 1)).toEqualTypeOf<number>();
  });

  it('accepts a value of a type wider than the element type', () => {
    expectTypeOf(arrayIndexOf(LEVELS, 'info' as string)).toEqualTypeOf<number>();
    expectTypeOf(arrayIndexOf(LEVELS, 'info' as unknown)).toEqualTypeOf<number>();
    expectTypeOf(arrayIndexOf(LEVELS, 'info' as string | undefined)).toEqualTypeOf<number>();
    expectTypeOf(
      arrayIndexOf([] as readonly string[], 1 as string | number),
    ).toEqualTypeOf<number>();
  });

  it('rejects a value of an unrelated type', () => {
    // @ts-expect-error a number is never in an array of strings
    arrayIndexOf(['a', 'b'], 1);
    // @ts-expect-error a number is never in an array of string literals
    arrayIndexOf(LEVELS, 1);
  });
});
