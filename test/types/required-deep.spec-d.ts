import type {IsExactOptionalPropertyTypes} from '../../src/_internal/types.ts';
import type {RequiredDeep} from '../../src/types/required-deep.ts';

describe('types/RequiredDeep', () => {
  it('basic test', () => {
    expectTypeOf<RequiredDeep<{a?: {b?: number}}>>().toEqualTypeOf<{a: {b: number}}>();
  });

  it('removes an explicit `undefined` from a property type only without `exactOptionalPropertyTypes`', () => {
    expectTypeOf<RequiredDeep<{a?: {b?: string | undefined}}>>().toEqualTypeOf<{
      a: {b: IsExactOptionalPropertyTypes extends true ? string | undefined : string};
    }>();
  });
});
