import {stringSplit} from '../../src/string/string-split.ts';

const DIGIT_REGEX = /\d/;

describe('string/stringSplit', () => {
  it('gives a tuple of the parts for a literal string and delimiter', () => {
    expectTypeOf(stringSplit('foo-bar-baz', '-')).toEqualTypeOf<['foo', 'bar', 'baz']>();
    expectTypeOf(stringSplit('你好,世界', ',')).toEqualTypeOf<['你好', '世界']>();
  });

  it('gives `string[]` for a string that is not a literal', () => {
    expectTypeOf(stringSplit('a-b' as string, '-')).toEqualTypeOf<string[]>();
  });

  it('gives `string[]` for a regular expression, a limit or no delimiter', () => {
    expectTypeOf(stringSplit('a1b2c', DIGIT_REGEX)).toEqualTypeOf<string[]>();
    expectTypeOf(stringSplit('a-b-c', '-', 2)).toEqualTypeOf<string[]>();
    expectTypeOf(stringSplit('a-b-c')).toEqualTypeOf<string[]>();
    expectTypeOf(stringSplit('a-b-c', undefined, 1)).toEqualTypeOf<string[]>();
  });
});
