import {stringRepeat} from '../../src/string/string-repeat.ts';

declare const nonLiteralString: string;

describe('string/stringRepeat', () => {
  it('types the result as the precise repeated literal', () => {
    expectTypeOf(stringRepeat('ab', 3)).toEqualTypeOf<'ababab'>(); // cspell:disable-line
  });

  it('widens a non-literal string to string', () => {
    expectTypeOf(stringRepeat(nonLiteralString, 3)).toEqualTypeOf<string>();
  });

  it('types the result as the repeated literal for a count of up to 45', () => {
    expectTypeOf(
      stringRepeat('-', 45),
    ).toEqualTypeOf<'---------------------------------------------'>();
  });

  it('types the result as `string` for a count above 45', () => {
    expectTypeOf(stringRepeat('-', 46)).toEqualTypeOf<string>();
    expectTypeOf(stringRepeat('ab', 1000)).toEqualTypeOf<string>();
  });
});
