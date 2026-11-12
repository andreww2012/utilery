import {padStart} from '../../src/string/pad-start.ts';

describe('string/padStart', () => {
  it('types the result as the precise padded literal', () => {
    expectTypeOf(padStart('5', 3, '0')).toEqualTypeOf<'005'>();
  });

  it('types the result as the padded literal when up to 45 characters are added', () => {
    expectTypeOf(
      padStart('5', 46, '0'),
    ).toEqualTypeOf<'0000000000000000000000000000000000000000000005'>();
  });

  it('types the result as a template literal when more than 45 characters are added', () => {
    expectTypeOf(padStart('5', 47, '0')).toEqualTypeOf<`${string}5`>();
    expectTypeOf(padStart('5', 100, 'ab')).toEqualTypeOf<`${string}5`>();
  });
});
