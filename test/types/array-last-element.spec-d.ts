import type {ArrayLastElement} from '../../src/types/array-last-element.ts';
import type {OptionalUndefined} from '../exact-optional-property-types.ts';

describe('types/ArrayLastElement', () => {
  it('basic test', () => {
    expectTypeOf<ArrayLastElement<[1, 2, 3]>>().toEqualTypeOf<3>();
  });

  it('gives the union of the types that may be last, with `undefined` for an optional element', () => {
    expectTypeOf<ArrayLastElement<[string, number?]>>().toEqualTypeOf<
      string | number | OptionalUndefined
    >();
  });
});
