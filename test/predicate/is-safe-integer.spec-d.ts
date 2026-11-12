import {isSafeInteger} from '../../src/predicate/is-safe-integer.ts';

describe('predicate/isSafeInteger', () => {
  it('keeps the type of a number in both branches', () => {
    const value = Number.parseFloat('1.5');

    expectTypeOf(isSafeInteger(value)).toEqualTypeOf<boolean>();
    if (isSafeInteger(value)) {
      expectTypeOf(value).toEqualTypeOf<number>();
    }

    if (!isSafeInteger(value)) {
      expectTypeOf(value).toEqualTypeOf<number>();
    }

    expectTypeOf([1, 1.5].filter(isSafeInteger)).toEqualTypeOf<number[]>();
  });
});
