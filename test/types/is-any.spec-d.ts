import type {IsAny} from '../../src/types/is-any.ts';

describe('types/IsAny', () => {
  it('basic test', () => {
    // eslint-disable-next-line ts/no-explicit-any -- intentionally probing `IsAny`
    expectTypeOf<IsAny<any>>().toEqualTypeOf<true>();
    expectTypeOf<IsAny<string>>().toEqualTypeOf<false>();
  });
});
