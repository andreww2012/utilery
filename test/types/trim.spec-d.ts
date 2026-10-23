import type {Trim} from '../../src/types/trim.ts';

describe('types/Trim', () => {
  it('basic test', () => {
    expectTypeOf<Trim<' hi '>>().toEqualTypeOf<'hi'>();
  });

  it('removes any whitespace, not only spaces', () => {
    expectTypeOf<Trim<'\tfoo\n'>>().toEqualTypeOf<'foo'>();
  });
});
