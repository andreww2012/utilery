import type {EmptyObject} from '../../src/types/index.ts';
import type {MergeExclusive} from '../../src/types/merge-exclusive.ts';

describe('types/MergeExclusive', () => {
  it('basic test', () => {
    expectTypeOf<
      {a: 1} extends MergeExclusive<{a: 1}, {b: 2}> ? true : false
    >().toEqualTypeOf<true>();
    expectTypeOf<
      {a: 1; b: 2} extends MergeExclusive<{a: 1}, {b: 2}> ? true : false
    >().toEqualTypeOf<false>();
  });

  it('accepts objects without the keys when every key is optional and in the second type', () => {
    type Source = MergeExclusive<{b?: 2}, {b?: 2; c?: 3}>;

    expectTypeOf<EmptyObject extends Source ? true : false>().toEqualTypeOf<true>();
    expectTypeOf<{d: 1} extends Source ? true : false>().toEqualTypeOf<true>();
  });

  it('keeps `any` and `unknown`', () => {
    // eslint-disable-next-line ts/no-explicit-any -- the type under test
    expectTypeOf<MergeExclusive<any, {a: 1}>>().toBeAny();
    expectTypeOf<MergeExclusive<unknown, {a: 1}>>().toBeUnknown();
  });
});
