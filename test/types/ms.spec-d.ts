import type {Ms} from '../../src/types/ms.ts';

describe('types/Ms', () => {
  it('converts duration strings to milliseconds', () => {
    expectTypeOf<Ms<'1ms'>>().toEqualTypeOf<1>();
    expectTypeOf<Ms<'1s'>>().toEqualTypeOf<1000>();
    expectTypeOf<Ms<'42m'>>().toEqualTypeOf<2_520_000>();
    expectTypeOf<Ms<'1h'>>().toEqualTypeOf<3_600_000>();
    expectTypeOf<Ms<'1d'>>().toEqualTypeOf<86_400_000>();
    expectTypeOf<Ms<'1w'>>().toEqualTypeOf<604_800_000>();
    expectTypeOf<Ms<'1y'>>().toEqualTypeOf<31_557_600_000>();
  });

  it('supports aliases, negatives, floats, and whitespace', () => {
    expectTypeOf<Ms<'1 seconds'>>().toEqualTypeOf<1000>();
    expectTypeOf<Ms<'1 hour'>>().toEqualTypeOf<3_600_000>();
    expectTypeOf<Ms<'-42s'>>().toEqualTypeOf<-42_000>();
    expectTypeOf<Ms<'3.14d'>>().toEqualTypeOf<271_296_000>();
    expectTypeOf<Ms<'  010ms  '>>().toEqualTypeOf<10>();
    expectTypeOf<Ms<'1.5 hours'>>().toEqualTypeOf<5_400_000>();
    expectTypeOf<Ms<'\t- 1s\n'>>().toEqualTypeOf<-1000>();
  });

  it('ignores the case of units', () => {
    expectTypeOf<Ms<'1S'>>().toEqualTypeOf<1000>();
    expectTypeOf<Ms<'1 Hours'>>().toEqualTypeOf<3_600_000>();
  });

  it('treats a number without a unit as milliseconds', () => {
    expectTypeOf<Ms<'100'>>().toEqualTypeOf<100>();
  });

  it('resolves too large or too small results to `number`', () => {
    expectTypeOf<Ms<'100000000000y'>>().toEqualTypeOf<number>();
    expectTypeOf<Ms<'0.0000001ms'>>().toEqualTypeOf<number>();
  });

  it('resolves invalid inputs to `never`', () => {
    expectTypeOf<Ms<'s'>>().toEqualTypeOf<never>();
    expectTypeOf<Ms<'--42ms'>>().toEqualTypeOf<never>();
    expectTypeOf<Ms<'42mss'>>().toEqualTypeOf<never>();
  });
});
