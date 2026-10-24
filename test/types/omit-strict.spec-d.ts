import type {EmptyObject} from '../../src/types/index.ts';
import type {OmitStrict} from '../../src/types/omit-strict.ts';

describe('types/OmitStrict', () => {
  it('basic test', () => {
    expectTypeOf<OmitStrict<{a: 1; b: 2}, 'b'>>().toEqualTypeOf<{a: 1}>();
  });

  it('accepts objects without the removed keys when all keys are removed', () => {
    type WithoutA = OmitStrict<{a: 1}, 'a', {requireExactProps: true}>;

    expectTypeOf<EmptyObject extends WithoutA ? true : false>().toEqualTypeOf<true>();
    expectTypeOf<{c: 1} extends WithoutA ? true : false>().toEqualTypeOf<true>();
    expectTypeOf<{a: 1} extends WithoutA ? true : false>().toEqualTypeOf<false>();
  });
});
