import type {IsExactOptionalPropertyTypes} from '../../src/_internal/types.ts';
import type {EveryElementExtends} from '../../src/types/every-element-extends.ts';

describe('types/EveryElementExtends', () => {
  it('basic test', () => {
    expectTypeOf<EveryElementExtends<[1, 2], number>>().toEqualTypeOf<true>();
  });

  it('fully matches an optional element only when `Type` includes `undefined`, unless `exactOptionalPropertyTypes` is on', () => {
    expectTypeOf<EveryElementExtends<[number, number?], number>>().toEqualTypeOf<
      IsExactOptionalPropertyTypes extends true ? true : boolean
    >();
    expectTypeOf<
      EveryElementExtends<[number, number?], number | undefined>
    >().toEqualTypeOf<true>();
  });
});
