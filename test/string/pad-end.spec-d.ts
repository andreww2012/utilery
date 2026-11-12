import {padEnd} from '../../src/string/pad-end.ts';

describe('string/padEnd', () => {
  it('types the result as the precise padded literal', () => {
    expectTypeOf(padEnd('5', 3, '0')).toEqualTypeOf<'500'>();
  });

  it('types the result as the padded literal when up to 45 characters are added', () => {
    expectTypeOf(
      padEnd('5', 46, '0'),
    ).toEqualTypeOf<'5000000000000000000000000000000000000000000000'>();
  });

  it('types the result as a template literal when more than 45 characters are added', () => {
    expectTypeOf(padEnd('5', 47, '0')).toEqualTypeOf<`5${string}`>();
    expectTypeOf(padEnd('5', 100, 'ab')).toEqualTypeOf<`5${string}`>();
  });
});
