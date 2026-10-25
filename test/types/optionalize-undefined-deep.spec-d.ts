import type {OptionalizeUndefinedDeep} from '../../src/types/optionalize-undefined-deep.ts';

describe('types/OptionalizeUndefinedDeep', () => {
  it('basic test', () => {
    expectTypeOf<OptionalizeUndefinedDeep<{a: number | undefined}>>().toEqualTypeOf<{
      a?: number | undefined;
    }>();
  });
});
