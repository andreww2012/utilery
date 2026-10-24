import type {EmptyObject} from '../../src/types/index.ts';
import type {RequireOneOrNone} from '../../src/types/require-one-or-none.ts';

describe('types/RequireOneOrNone', () => {
  it('basic test', () => {
    expectTypeOf<
      EmptyObject extends RequireOneOrNone<{a?: 1; b?: 2}> ? true : false
    >().toEqualTypeOf<true>();
  });

  it('accepts objects without the keys when the type has no other keys', () => {
    expectTypeOf<
      {c: 1} extends RequireOneOrNone<{a?: 1; b?: 2}> ? true : false
    >().toEqualTypeOf<true>();
  });
});
