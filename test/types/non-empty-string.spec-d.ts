import type {NonEmptyString} from '../../src/types/non-empty-string.ts';

describe('types/NonEmptyString', () => {
  it('basic test', () => {
    expectTypeOf<NonEmptyString<'a'>>().toEqualTypeOf<'a'>();
  });

  it('accepts a string type that cannot be empty, even if it is not a literal', () => {
    expectTypeOf<NonEmptyString<`a${string}`>>().toEqualTypeOf<`a${string}`>();
  });

  it('gives `never` for a string type that can be empty', () => {
    expectTypeOf<NonEmptyString<''>>().toBeNever();
    expectTypeOf<NonEmptyString<string>>().toBeNever();
    expectTypeOf<NonEmptyString<Uppercase<string>>>().toBeNever();
  });
});
