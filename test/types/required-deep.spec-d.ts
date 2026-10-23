import type {RequiredDeep} from '../../src/types/required-deep.ts';

describe('types/RequiredDeep', () => {
  it('basic test', () => {
    expectTypeOf<RequiredDeep<{a?: {b?: number}}>>().toEqualTypeOf<{a: {b: number}}>();
  });

  it('removes an explicit `undefined` from a property type too', () => {
    // eslint-disable-next-line sonar/no-redundant-optional -- the explicit `undefined` is what is tested
    expectTypeOf<RequiredDeep<{a?: {b?: string | undefined}}>>().toEqualTypeOf<{a: {b: string}}>();
  });
});
