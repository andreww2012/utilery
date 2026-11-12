import {isValidDate} from '../../src/predicate/is-valid-date.ts';

describe('predicate/isValidDate', () => {
  it('narrows a value to `Date`, but only when it returns `true`', () => {
    const value: unknown = new Date();

    if (isValidDate(value)) {
      expectTypeOf(value).toEqualTypeOf<Date>();
    } else {
      expectTypeOf(value).toEqualTypeOf<unknown>();
    }

    expectTypeOf([new Date(), 1].filter(isValidDate)).toEqualTypeOf<Date[]>();
  });

  it('does not narrow a `Date`, which may be invalid', () => {
    const date = new Date('not a date');

    expectTypeOf(isValidDate(date)).toEqualTypeOf<boolean>();
    if (!isValidDate(date)) {
      expectTypeOf(date).toEqualTypeOf<Date>();
    }
  });

  it('drops the `Date` of a union when it returns `false`', () => {
    const value = undefined as Date | undefined;

    if (isValidDate(value)) {
      expectTypeOf(value).toEqualTypeOf<Date>();
    } else {
      expectTypeOf(value).toEqualTypeOf<undefined>();
    }
  });
});
