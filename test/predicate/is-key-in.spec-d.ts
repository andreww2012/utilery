import {isKeyIn} from '../../src/predicate/is-key-in.ts';

describe('predicate/isKeyIn', () => {
  it('narrows the key to those present in the object', () => {
    const object = {foo: 1, bar: 2};
    const key = 'foo' as 'foo' | 'bar' | 'baz';

    if (isKeyIn(key, object)) {
      expectTypeOf(key).toEqualTypeOf<'foo' | 'bar'>();
    } else {
      expectTypeOf(key).toEqualTypeOf<'baz'>();
    }

    const name = 'foo' as string;
    if (isKeyIn(name, object)) {
      expectTypeOf(name).toEqualTypeOf<'foo' | 'bar'>();
    } else {
      expectTypeOf(name).toEqualTypeOf<string>();
    }
  });

  it('does not narrow a key whose type has only keys of the object type', () => {
    const counts: Record<string, number> = {};
    const word = 'a' as string;

    expectTypeOf(isKeyIn(word, counts)).toEqualTypeOf<boolean>();
    if (!isKeyIn(word, counts)) {
      expectTypeOf(word).toEqualTypeOf<string>();
    }

    const options = {} as {name: string; timeoutMs?: number};
    const option = 'name' as 'name' | 'timeoutMs';
    if (!isKeyIn(option, options)) {
      expectTypeOf(option).toEqualTypeOf<'name' | 'timeoutMs'>();
    }
  });

  it('does not narrow a key whose type has no keys of the object type', () => {
    const object: object = {};
    const key = 'a' as string;

    if (isKeyIn(key, object)) {
      expectTypeOf(key).toEqualTypeOf<string>();
    }

    // The check always fails for `constructor`
    const constructorKey = 'constructor' as 'constructor' | 'other';
    if (isKeyIn(constructorKey, {constructor: 1})) {
      expectTypeOf(constructorKey).toEqualTypeOf<'constructor' | 'other'>();
    }
  });

  it('drops the keys of the object type from a union when it returns `false`', () => {
    const options = {} as {name: string; timeoutMs?: number};
    const option = 'name' as 'name' | 'timeoutMs' | 'other';

    if (!isKeyIn(option, options)) {
      expectTypeOf(option).toEqualTypeOf<'other'>();
    }
  });
});
