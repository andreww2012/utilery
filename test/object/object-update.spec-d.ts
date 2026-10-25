import type {IsExactOptionalPropertyTypes} from '../../src/_internal/types.ts';
import {objectUpdate} from '../../src/object/object-update.ts';

// Whether `objectUpdate` accepts `Source` as the update of `Target`
type IsAccepted<Target extends object, Source extends object> = Source extends Parameters<
  typeof objectUpdate<Target, Source>
>[1]
  ? true
  : false;

describe('object/objectUpdate', () => {
  it('returns the target type unchanged', () => {
    expectTypeOf(objectUpdate({name: 'Ada', age: 41}, {age: 42})).toEqualTypeOf<{
      name: string;
      age: number;
    }>();
  });

  it('rejects a key that does not exist on the target', () => {
    const user = {name: 'Ada', age: 41};

    // @ts-expect-error - 'email' does not exist on the target
    objectUpdate(user, {email: 'ada@example.com'});
  });

  it('rejects a mismatched value type', () => {
    const user = {name: 'Ada', age: 41};

    // @ts-expect-error - 'age' must be a number
    objectUpdate(user, {age: '42'});
  });

  it('rejects `undefined` for a property that does not allow it', () => {
    expectTypeOf<IsAccepted<{a: number}, {a: number | undefined}>>().toEqualTypeOf<false>();
    expectTypeOf<IsAccepted<{a?: number | undefined}, {a: undefined}>>().toEqualTypeOf<true>();
    // An optional property may hold `undefined` only without `exactOptionalPropertyTypes`
    expectTypeOf<
      IsAccepted<{a: number}, {a?: number}>
    >().toEqualTypeOf<IsExactOptionalPropertyTypes>();
    expectTypeOf<IsAccepted<{a?: number}, {a: undefined}>>().toEqualTypeOf<
      IsExactOptionalPropertyTypes extends true ? false : true
    >();
  });
});
