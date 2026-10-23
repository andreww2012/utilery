import type {IsEqual} from '../../src/types/is-equal.ts';

describe('types/IsEqual', () => {
  it('basic test', () => {
    expectTypeOf<IsEqual<1, 1>>().toEqualTypeOf<true>();
    expectTypeOf<IsEqual<1, 2>>().toEqualTypeOf<false>();
  });

  it('does not treat an intersection as equal to the merged object type', () => {
    expectTypeOf<IsEqual<{a: 1} & {b: 2}, {a: 1; b: 2}>>().toEqualTypeOf<false>();
  });
});
