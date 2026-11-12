import {isIn} from '../../src/predicate/is-in.ts';

describe('predicate/isIn', () => {
  it('narrows the object to include the checked key, but only when it returns `true`', () => {
    const data: unknown = {foo: 1};

    if (isIn('foo', data)) {
      expectTypeOf(data).toEqualTypeOf<Record<'foo', unknown>>();
    } else {
      expectTypeOf(data).toEqualTypeOf<unknown>();
    }

    const object = {foo: 1, bar: 2};
    const key = 'foo' as string;
    // eslint-disable-next-line ts/no-unnecessary-condition -- it narrows: an object literal type has no index signature of its own
    if (isIn(key, object)) {
      expectTypeOf(object[key]).toEqualTypeOf<unknown>();
    } else {
      expectTypeOf(object).toEqualTypeOf<{foo: number; bar: number}>();
    }

    const options = {} as {timeoutMs?: number};
    if (isIn('timeoutMs', options)) {
      expectTypeOf(options).toEqualTypeOf<{timeoutMs?: number} & Record<'timeoutMs', unknown>>();
    } else {
      expectTypeOf(options).toEqualTypeOf<{timeoutMs?: number}>();
    }
  });

  it('does not narrow an object whose type already has the property', () => {
    const counts: Record<string, number> = {};
    const word = 'a' as string;

    expectTypeOf(isIn(word, counts)).toEqualTypeOf<boolean>();
    if (!isIn(word, counts)) {
      expectTypeOf(counts).toEqualTypeOf<Record<string, number>>();
    }

    // The check always fails for `constructor`
    const object = {} as {constructor: string};
    if (!isIn('constructor', object)) {
      expectTypeOf(object).toEqualTypeOf<{constructor: string}>();
    }
  });

  it('drops the union members whose type already has the key when it returns `false`', () => {
    const value = new Date() as Record<string, number> | Date;
    const key = 'a' as string;

    if (!isIn(key, value)) {
      expectTypeOf(value).toEqualTypeOf<Date>();
    }
  });
});
