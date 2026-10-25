import type {IsExactOptionalPropertyTypes} from '../../src/_internal/types.ts';
import type {SomeElementExtends} from '../../src/types/some-element-extends.ts';

describe('types/SomeElementExtends', () => {
  it('basic test', () => {
    expectTypeOf<SomeElementExtends<[1, 'x'], number>>().toEqualTypeOf<true>();
  });

  it('fully matches an optional element only when `Type` includes `undefined`, unless `exactOptionalPropertyTypes` is on', () => {
    expectTypeOf<SomeElementExtends<[string, number?], number>>().toEqualTypeOf<
      IsExactOptionalPropertyTypes extends true ? true : boolean
    >();
    expectTypeOf<SomeElementExtends<[string, number?], number | undefined>>().toEqualTypeOf<true>();
  });
});
