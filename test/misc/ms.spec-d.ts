import {ms} from '../../src/misc/ms.ts';

describe('misc/ms', () => {
  it('enforces the milliseconds value from the generic', () => {
    expectTypeOf(ms<'42m'>)
      .parameter(0)
      .toEqualTypeOf<2_520_000>();
    expectTypeOf(ms<'42m'>(2_520_000)).toEqualTypeOf<2_520_000>();

    // @ts-expect-error wrong milliseconds value for the '42m' duration
    ms<'42m'>(42);
  });

  it('accepts every duration string that `Ms` accepts', () => {
    expectTypeOf(ms<'100'>(100)).toEqualTypeOf<100>();
    expectTypeOf(ms<' - 1s '>(-1000)).toEqualTypeOf<-1000>();
  });

  it('requires the duration string', () => {
    // @ts-expect-error no duration string to check the value against
    ms(1000);
  });
});
