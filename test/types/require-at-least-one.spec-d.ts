import type {EmptyObject} from '../../src/types/index.ts';
import type {RequireAtLeastOne} from '../../src/types/require-at-least-one.ts';

describe('types/RequireAtLeastOne', () => {
  it('basic test', () => {
    expectTypeOf<
      {a: 1} extends RequireAtLeastOne<{a?: 1; b?: 2}> ? true : false
    >().toEqualTypeOf<true>();
    expectTypeOf<
      EmptyObject extends RequireAtLeastOne<{a?: 1; b?: 2}> ? true : false
    >().toEqualTypeOf<false>();
  });

  it('is a union of single object types', () => {
    expectTypeOf<RequireAtLeastOne<{a?: 1; b?: 2; c: 3}, 'a' | 'b'>>().toEqualTypeOf<
      {a: 1; b?: 2; c: 3} | {a?: 1; b: 2; c: 3}
    >();
  });

  it('gives `any` for `any`', () => {
    // eslint-disable-next-line ts/no-explicit-any -- the type under test
    expectTypeOf<RequireAtLeastOne<any>>().toBeAny();
  });
});
