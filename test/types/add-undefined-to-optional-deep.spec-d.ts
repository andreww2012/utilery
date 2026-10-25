import type {AddUndefinedToOptionalDeep} from '../../src/types/add-undefined-to-optional-deep.ts';

describe('types/AddUndefinedToOptionalDeep', () => {
  it('basic test', () => {
    expectTypeOf<AddUndefinedToOptionalDeep<{a?: number}>['a']>().toEqualTypeOf<
      number | undefined
    >();
  });

  it('lets optional properties at any depth be set to `undefined`', () => {
    expectTypeOf<{a: undefined; b: {c: undefined}}>().toExtend<
      AddUndefinedToOptionalDeep<{a?: number; b: {c?: string}}>
    >();
  });
});
