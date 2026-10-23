import {stringRepeat} from '../../src/string/string-repeat.ts';

declare const nonLiteralString: string;

describe('string/stringRepeat', () => {
  it('types the result as the precise repeated literal', () => {
    expectTypeOf(stringRepeat('ab', 3)).toEqualTypeOf<'ababab'>(); // cspell:disable-line
  });

  it('widens a non-literal string to string', () => {
    expectTypeOf(stringRepeat(nonLiteralString, 3)).toEqualTypeOf<string>();
  });
});
