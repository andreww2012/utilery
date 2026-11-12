import {negatePredicate} from '../../src/function/negate-predicate.ts';
import {isValidDate} from '../../src/predicate/is-valid-date.ts';

const isString = (value: unknown): value is string => typeof value === 'string';

describe('function/negatePredicate', () => {
  it('narrows the value to the types the original guard excludes', () => {
    const value = 1 as string | number;

    if (negatePredicate(isString)(value)) {
      expectTypeOf(value).toEqualTypeOf<number>();
    } else {
      expectTypeOf(value).toEqualTypeOf<string>();
    }
  });

  it('narrows a value that has the type of the original guard to `never` when it returns `true`', () => {
    const date = new Date('not a date');

    if (negatePredicate(isValidDate)(date)) {
      expectTypeOf(date).toBeNever();
    }
  });

  it('drops the union members that have the type of the original guard when it returns `true`', () => {
    const date = undefined as Date | undefined;

    if (negatePredicate(isValidDate)(date)) {
      expectTypeOf(date).toEqualTypeOf<undefined>();
    }
  });
});
