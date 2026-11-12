import {stringIncludes} from '../../src/string/string-includes.ts';

describe('string/stringIncludes', () => {
  it('narrows a `string` to a template literal type that contains the search value', () => {
    const fileName = 'user.test.ts' as string;

    if (stringIncludes(fileName, 'test')) {
      expectTypeOf(fileName).toEqualTypeOf<`${string}test${string}`>();
    } else {
      expectTypeOf(fileName).toEqualTypeOf<string>();
    }
  });

  it('splits a union of string literals between the branches', () => {
    const page = 'HouseCalendar' as 'HouseCalendar' | 'SenateCalendar' | 'HouseFirstReading';

    if (stringIncludes(page, 'Calendar')) {
      expectTypeOf(page).toEqualTypeOf<'HouseCalendar' | 'SenateCalendar'>();
    } else {
      expectTypeOf(page).toEqualTypeOf<'HouseFirstReading'>();
    }
  });

  it('keeps a template literal member when the check fails', () => {
    const key = 'b' as `a${string}` | 'b';

    if (stringIncludes(key, 'ab')) {
      expectTypeOf(key).toEqualTypeOf<`a${string}` & `${string}ab${string}`>();
    } else {
      expectTypeOf(key).toEqualTypeOf<`a${string}` | 'b'>();
    }
  });

  it('narrows nothing for a search value that is not a single string literal', () => {
    const fileName = 'user.test.ts' as string;
    const search = 'test' as string;
    const kind = 'test' as 'test' | 'spec';

    expectTypeOf(stringIncludes(fileName, search)).toEqualTypeOf<boolean>();
    expectTypeOf(stringIncludes(fileName, kind)).toEqualTypeOf<boolean>();

    if (stringIncludes(fileName, kind)) {
      expectTypeOf(fileName).toEqualTypeOf<string>();
    }
  });

  it('narrows nothing with a position', () => {
    const page = 'HouseCalendar' as 'HouseCalendar' | 'SenateCalendar';

    expectTypeOf(stringIncludes(page, 'House', 1)).toEqualTypeOf<boolean>();

    if (!stringIncludes(page, 'House', 1)) {
      expectTypeOf(page).toEqualTypeOf<'HouseCalendar' | 'SenateCalendar'>();
    }
  });

  it('keeps `any` as it is', () => {
    // eslint-disable-next-line ts/no-explicit-any -- the type under test
    const value: any = 'value';

    if (stringIncludes(value, 'al')) {
      expectTypeOf(value).toBeAny();
    }
  });
});
