import {bindLate} from '../../src/function/bind-late.ts';

describe('function/bindLate', () => {
  it('keeps `placeholder` writable', () => {
    type Placeholder = Pick<typeof bindLate, 'placeholder'>;

    expectTypeOf<Placeholder>().toEqualTypeOf<{
      -readonly [Key in keyof Placeholder]: Placeholder[Key];
    }>();
  });

  it('returns a function that takes and returns anything', () => {
    // eslint-disable-next-line ts/no-explicit-any -- the type under test
    expectTypeOf(bindLate({}, 'key')).toEqualTypeOf<(...parameters: any[]) => any>();
  });
});
