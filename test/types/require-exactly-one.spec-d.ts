import type {RequireExactlyOne} from '../../src/types/require-exactly-one.ts';

describe('types/RequireExactlyOne', () => {
  it('basic test', () => {
    expectTypeOf<
      {a: 1} extends RequireExactlyOne<{a?: 1; b?: 2}> ? true : false
    >().toEqualTypeOf<true>();
    expectTypeOf<
      {a: 1; b: 2} extends RequireExactlyOne<{a?: 1; b?: 2}> ? true : false
    >().toEqualTypeOf<false>();
  });

  it('is a union of single object types', () => {
    expectTypeOf<RequireExactlyOne<{a?: 1; b?: 2; c: 3}, 'a' | 'b'>>().toEqualTypeOf<
      {a: 1; b?: never; c: 3} | {a?: never; b: 2; c: 3}
    >();
  });

  it('gives `any` for `any`', () => {
    // eslint-disable-next-line ts/no-explicit-any -- the type under test
    expectTypeOf<RequireExactlyOne<any>>().toBeAny();
  });
});
