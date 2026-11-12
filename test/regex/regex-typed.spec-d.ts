/* eslint-disable unicorn/prefer-string-raw -- `arkregex` infers from string *literals*; `String.raw` widens to `string`, which breaks inference */
import {type RegexTyped, regexTyped} from '../../src/regex/regex-typed.ts';

type CaseInsensitiveOk = 'ok' | 'oK' | 'Ok' | 'OK';

describe('regex/regexTyped', () => {
  it('infers a literal pattern and its case-insensitive variants', () => {
    expectTypeOf(regexTyped('^ok$', 'i')).toEqualTypeOf<
      RegexTyped<CaseInsensitiveOk, {flags: 'i'}>
    >();
  });

  it('infers positional captures', () => {
    expectTypeOf(regexTyped('^(\\d+)\\.(\\d+)\\.(\\d+)$')).toEqualTypeOf<
      RegexTyped<
        `${number}.${number}.${number}`,
        {captures: [`${number}`, `${number}`, `${number}`]}
      >
    >();
  });

  it('infers named captures', () => {
    expectTypeOf(regexTyped('^(?<name>\\w+)@(?<domain>\\w+\\.\\w+)$')).toEqualTypeOf<
      RegexTyped<
        `${string}@${string}.${string}`,
        {
          captures: [string, `${string}.${string}`];
          names: {domain: `${string}.${string}`; name: string};
        }
      >
    >();
  });

  it('narrows the argument of .test() to the inferred pattern', () => {
    const pattern = regexTyped('^ok$', 'i');
    const value = 'whatever' as string;

    if (pattern.test(value)) {
      expectTypeOf(value).toEqualTypeOf<CaseInsensitiveOk>();
    }
  });

  it('types positional and named captures on the .exec() result', () => {
    const positional = regexTyped('^(\\d+)$').exec('5');
    if (positional) {
      expectTypeOf(positional[1]).toEqualTypeOf<`${number}`>();
    }

    const named = regexTyped('^(?<year>\\d+)$').exec('2026');
    if (named) {
      expectTypeOf(named.groups.year).toEqualTypeOf<`${number}`>();
    }
  });

  it('rejects a non-literal (widened) source at the type level', () => {
    const dynamicSource = '^a$' as string;
    // @ts-expect-error inference requires a string literal source
    regexTyped(dynamicSource);
  });

  it('reports invalid patterns as type errors', () => {
    // @ts-expect-error referencing a group that does not exist
    regexTyped('^(?<n>a)\\k<missing>$');
  });

  it('exposes the type-level namespace helpers', () => {
    expectTypeOf<regexTyped.infer<'^ok$', 'i'>>().toEqualTypeOf<CaseInsensitiveOk>();

    expectTypeOf<regexTyped.validate<'^a$'>>().toEqualTypeOf<'^a$'>();

    expectTypeOf<regexTyped.parse<'^ok$', 'i'>>().toEqualTypeOf<
      RegexTyped<CaseInsensitiveOk, {flags: 'i'}>
    >();
  });

  it('manually types complex patterns via .as', () => {
    expectTypeOf(regexTyped.as<`id-${string}`, {captures: [string]}>('id-(.+)')).toEqualTypeOf<
      RegexTyped<`id-${string}`, {captures: [string]}>
    >();
  });
});
