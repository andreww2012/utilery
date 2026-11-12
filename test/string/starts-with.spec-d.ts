import {startsWith} from '../../src/string/starts-with.ts';

describe('string/startsWith', () => {
  it('narrows a `string` to a template literal type with the prefix', () => {
    const url = 'https://example.com' as string;

    if (startsWith(url, 'https://')) {
      expectTypeOf(url).toEqualTypeOf<`https://${string}`>();
    } else {
      expectTypeOf(url).toEqualTypeOf<string>();
    }
  });

  it('splits a union of string literals between the branches', () => {
    const size = 'sm' as 'sm' | 'md' | 'lg';

    if (startsWith(size, 's')) {
      expectTypeOf(size).toEqualTypeOf<'sm'>();
    } else {
      expectTypeOf(size).toEqualTypeOf<'md' | 'lg'>();
    }
  });

  it('narrows nothing for a prefix that is not a single string literal', () => {
    const url = 'https://example.com' as string;
    const prefix = 'https://' as string;
    const scheme = 'http' as 'http' | 'ftp';

    expectTypeOf(startsWith(url, prefix)).toEqualTypeOf<boolean>();
    expectTypeOf(startsWith(url, scheme)).toEqualTypeOf<boolean>();

    if (startsWith(url, scheme)) {
      expectTypeOf(url).toEqualTypeOf<string>();
    }
  });

  it('narrows nothing with a position', () => {
    const url = 'https://example.com' as string;

    expectTypeOf(startsWith(url, 'example', 8)).toEqualTypeOf<boolean>();

    if (startsWith(url, 'example', 8)) {
      expectTypeOf(url).toEqualTypeOf<string>();
    }
  });
});
