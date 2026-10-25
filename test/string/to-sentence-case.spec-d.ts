import {toSentenceCase} from '../../src/string/to-sentence-case.ts';

declare const nonLiteralString: string;

describe('string/toSentenceCase', () => {
  it('types a string literal as the precise sentence-cased literal', () => {
    expectTypeOf(toSentenceCase('fooBar')).toEqualTypeOf<'Foo bar'>();
    expectTypeOf(toSentenceCase('XMLHttpRequest')).toEqualTypeOf<'Xml http request'>();
    expectTypeOf(toSentenceCase('snake_case-and-kebab')).toEqualTypeOf<'Snake case and kebab'>();
  });

  it('widens a non-literal string to string', () => {
    expectTypeOf(toSentenceCase(nonLiteralString)).toEqualTypeOf<string>();
  });
});
