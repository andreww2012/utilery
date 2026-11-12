import {endsWith} from '../../src/string/ends-with.ts';

describe('string/endsWith', () => {
  it('narrows a `string` to a template literal type with the suffix', () => {
    const fileName = 'data.json' as string;

    if (endsWith(fileName, '.json')) {
      expectTypeOf(fileName).toEqualTypeOf<`${string}.json`>();
    } else {
      expectTypeOf(fileName).toEqualTypeOf<string>();
    }
  });

  it('splits a union of string literals between the branches', () => {
    const unit = '10px' as '10px' | '2em' | '5px';

    if (endsWith(unit, 'px')) {
      expectTypeOf(unit).toEqualTypeOf<'10px' | '5px'>();
    } else {
      expectTypeOf(unit).toEqualTypeOf<'2em'>();
    }
  });

  it('narrows nothing for a suffix that is not a single string literal', () => {
    const fileName = 'data.json' as string;
    const suffix = '.json' as string;
    const extension = '.json' as '.json' | '.yaml';

    expectTypeOf(endsWith(fileName, suffix)).toEqualTypeOf<boolean>();
    expectTypeOf(endsWith(fileName, extension)).toEqualTypeOf<boolean>();

    if (endsWith(fileName, extension)) {
      expectTypeOf(fileName).toEqualTypeOf<string>();
    }
  });

  it('narrows nothing with an end position', () => {
    const fileName = 'data.json' as string;

    expectTypeOf(endsWith(fileName, 'data', 4)).toEqualTypeOf<boolean>();

    if (endsWith(fileName, 'data', 4)) {
      expectTypeOf(fileName).toEqualTypeOf<string>();
    }
  });
});
