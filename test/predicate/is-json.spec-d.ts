import {isJson} from '../../src/predicate/is-json.ts';

describe('predicate/isJson', () => {
  it('narrows a value to `string`, but only when it returns `true`', () => {
    const value: unknown = '{}';

    if (isJson(value)) {
      expectTypeOf(value).toEqualTypeOf<string>();
    } else {
      expectTypeOf(value).toEqualTypeOf<unknown>();
    }
  });

  it('does not narrow a string, which may not be JSON', () => {
    const text = '{a: 1}' as string;

    expectTypeOf(isJson(text)).toEqualTypeOf<boolean>();
    if (!isJson(text)) {
      expectTypeOf(text).toEqualTypeOf<string>();
    }
  });

  it('drops the `string` of a union when it returns `false`', () => {
    const value = undefined as string | undefined;

    if (!isJson(value)) {
      expectTypeOf(value).toEqualTypeOf<undefined>();
    }
  });
});
