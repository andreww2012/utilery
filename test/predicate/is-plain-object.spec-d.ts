import {isPlainObject} from '../../src/predicate/is-plain-object.ts';

type NotPlainObject = Date | Map<string, number> | string[];

describe('predicate/isPlainObject', () => {
  it('narrows a value to `Record<PropertyKey, unknown>`, but only when it returns `true`', () => {
    const value: unknown = {};

    if (isPlainObject(value)) {
      expectTypeOf(value).toEqualTypeOf<Record<PropertyKey, unknown>>();
    } else {
      expectTypeOf(value).toEqualTypeOf<unknown>();
    }
  });

  it('allows reading symbol keys after it returns `true`', () => {
    const tag = Symbol('tag');
    const value: unknown = {[tag]: 1};

    if (isPlainObject(value)) {
      expectTypeOf(value[tag]).toEqualTypeOf<unknown>();
    }
  });

  it('keeps objects that are not plain in the `false` branch', () => {
    const value = new Date() as NotPlainObject;

    if (isPlainObject(value)) {
      expectTypeOf(value).toEqualTypeOf<NotPlainObject & Record<PropertyKey, unknown>>();
    } else {
      expectTypeOf(value).toEqualTypeOf<NotPlainObject>();
    }

    const object: object = {};
    if (!isPlainObject(object)) {
      expectTypeOf(object).toEqualTypeOf<object>();
    }
  });

  it('keeps a `Record<string, unknown>` member of a union in the `false` branch', () => {
    const value = new Date() as Date | Record<string, unknown>;

    if (isPlainObject(value)) {
      expectTypeOf(value).toEqualTypeOf<Record<PropertyKey, unknown>>();
    } else {
      expectTypeOf(value).toEqualTypeOf<Date | Record<string, unknown>>();
    }
  });

  it('does not narrow a value that already has the type of a plain object', () => {
    const options = {timeoutMs: 1};

    expectTypeOf(isPlainObject(options)).toEqualTypeOf<boolean>();
    if (!isPlainObject(options)) {
      expectTypeOf(options).toEqualTypeOf<{timeoutMs: number}>();
    }

    const record: Record<string, unknown> = {};
    expectTypeOf(isPlainObject(record)).toEqualTypeOf<boolean>();
  });

  it('drops the union members of plain object types when it returns `false`', () => {
    const value = undefined as {timeoutMs: number} | Record<string, number> | undefined;

    if (!isPlainObject(value)) {
      expectTypeOf(value).toEqualTypeOf<undefined>();
    }
  });
});
