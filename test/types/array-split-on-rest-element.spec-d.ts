import type {ArraySplitOnRestElement} from '../../src/types/array-split-on-rest-element.ts';
import type {OptionalUndefined} from '../exact-optional-property-types.ts';

describe('types/ArraySplitOnRestElement', () => {
  it('basic test', () => {
    expectTypeOf<ArraySplitOnRestElement<[1, ...number[], 2]>>().toEqualTypeOf<
      [[1], number[], [2]]
    >();
  });

  it('keeps optional elements, or makes them required with `preserveOptionalModifier: false`', () => {
    expectTypeOf<ArraySplitOnRestElement<[number, string?]>>().toEqualTypeOf<
      [[number, string?], [], []]
    >();
    expectTypeOf<
      ArraySplitOnRestElement<[number, string?], {preserveOptionalModifier: false}>
    >().toEqualTypeOf<[[number, string | OptionalUndefined], [], []]>();
  });
});
