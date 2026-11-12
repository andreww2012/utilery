import {isFiniteNumber} from '../../src/predicate/is-finite-number.ts';

describe('predicate/isFiniteNumber', () => {
  it('keeps the type of a number in both branches', () => {
    const value = Number.parseFloat('Infinity');

    expectTypeOf(isFiniteNumber(value)).toEqualTypeOf<boolean>();
    if (isFiniteNumber(value)) {
      expectTypeOf(value).toEqualTypeOf<number>();
    }

    if (!isFiniteNumber(value)) {
      expectTypeOf(value).toEqualTypeOf<number>();
    }

    expectTypeOf([1, Number.NaN].filter(isFiniteNumber)).toEqualTypeOf<number[]>();
  });
});
