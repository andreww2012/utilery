import type {ArrayReverse} from '../../src/types/array-reverse.ts';
import type {OptionalUndefined} from '../exact-optional-property-types.ts';

describe('types/ArrayReverse', () => {
  it('basic test', () => {
    expectTypeOf<ArrayReverse<[1, 2, 3]>>().toEqualTypeOf<[3, 2, 1]>();
  });

  it('gives a tuple per possible length for optional elements', () => {
    expectTypeOf<ArrayReverse<[string, number?]>>().toEqualTypeOf<
      [string] | [number | OptionalUndefined, string]
    >();
  });
});
