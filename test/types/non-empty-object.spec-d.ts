import type {NonEmptyObject} from '../../src/types/non-empty-object.ts';

describe('types/NonEmptyObject', () => {
  it('basic test', () => {
    expectTypeOf<NonEmptyObject<{a: 1}>>().toEqualTypeOf<{a: 1}>();
  });

  it('is a union of single object types for optional keys', () => {
    expectTypeOf<NonEmptyObject<{a?: 1; b?: 2}>>().toEqualTypeOf<{a: 1; b?: 2} | {a?: 1; b: 2}>();
  });

  it('gives `any` for `any`', () => {
    // eslint-disable-next-line ts/no-explicit-any -- the type under test
    expectTypeOf<NonEmptyObject<any>>().toBeAny();
  });
});
