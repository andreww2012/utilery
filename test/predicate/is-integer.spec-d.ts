import {isInteger} from '../../src/predicate/is-integer.ts';

describe('predicate/isInteger', () => {
  it('keeps the type of a number in both branches', () => {
    const value = Number.parseFloat('1.5');

    expectTypeOf(isInteger(value)).toEqualTypeOf<boolean>();
    if (isInteger(value)) {
      expectTypeOf(value).toEqualTypeOf<number>();
    }

    if (!isInteger(value)) {
      expectTypeOf(value).toEqualTypeOf<number>();
    }

    expectTypeOf([1, 1.5].filter(isInteger)).toEqualTypeOf<number[]>();
  });
});
