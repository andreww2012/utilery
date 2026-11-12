import {objectHasOwn} from '../../src/object/object-has-own.ts';

class Counter {
  count = 0;

  increment(): void {
    this.count += 1;
  }
}

describe('object/objectHasOwn', () => {
  it('narrows an object without the property, but only when it returns `true`', () => {
    const data: unknown = {id: 1};

    if (objectHasOwn(data, 'id')) {
      expectTypeOf(data).toEqualTypeOf<Record<'id', unknown>>();
    } else {
      expectTypeOf(data).toEqualTypeOf<unknown>();
    }

    const object = {foo: 1, bar: 2};
    const key = 'foo' as string;
    // eslint-disable-next-line ts/no-unnecessary-condition -- it narrows: an object literal type has no index signature of its own
    if (objectHasOwn(object, key)) {
      expectTypeOf(object[key]).toEqualTypeOf<unknown>();
    } else {
      expectTypeOf(object).toEqualTypeOf<{foo: number; bar: number}>();
    }

    const options = {} as {timeoutMs?: number};
    if (objectHasOwn(options, 'timeoutMs')) {
      expectTypeOf(options).toEqualTypeOf<{timeoutMs?: number} & Record<'timeoutMs', unknown>>();
    } else {
      expectTypeOf(options).toEqualTypeOf<{timeoutMs?: number}>();
    }
  });

  it('does not narrow an object whose type already has the property', () => {
    const counts: Record<string, number> = {};
    const word = 'a' as string;

    expectTypeOf(objectHasOwn(counts, word)).toEqualTypeOf<boolean>();
    if (!objectHasOwn(counts, word)) {
      expectTypeOf(counts).toEqualTypeOf<Record<string, number>>();
    }

    const counter = new Counter();
    if (!objectHasOwn(counter, 'increment')) {
      expectTypeOf(counter).toEqualTypeOf<Counter>();
    }
  });

  it('drops the union members whose type has the property when it returns `false`', () => {
    const value = {name: 'a'} as {id: number} | {name: string};

    if (!objectHasOwn(value, 'id')) {
      expectTypeOf(value).toEqualTypeOf<{name: string}>();
    }
  });
});
