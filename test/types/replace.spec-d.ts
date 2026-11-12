import type {Replace} from '../../src/types/replace.ts';

describe('types/Replace', () => {
  it('basic test', () => {
    // cspell:disable-next-line
    expectTypeOf<Replace<'foobar', 'bar', 'baz'>>().toEqualTypeOf<'foobaz'>();
  });
});
