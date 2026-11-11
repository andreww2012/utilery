import {arrayIncludes} from '../../src/array/array-includes.ts';

describe('array/arrayIncludes', () => {
  it('narrows a wider value to the element type, but only when it returns `true`', () => {
    const SIZES = ['s', 'm', 'l'] as const;
    const input = 's' as string;

    if (arrayIncludes(SIZES, input)) {
      expectTypeOf(input).toEqualTypeOf<'s' | 'm' | 'l'>();
    } else {
      expectTypeOf(input).toEqualTypeOf<string>();
    }

    const unknownInput: unknown = 's';
    if (arrayIncludes(SIZES, unknownInput)) {
      expectTypeOf(unknownInput).toEqualTypeOf<'s' | 'm' | 'l'>();
    } else {
      expectTypeOf(unknownInput).toEqualTypeOf<unknown>();
    }
  });

  it('keeps `null` and `undefined` when the array may hold them', () => {
    const array: readonly (string | undefined)[] = [undefined, 'a'];
    const value = undefined as string | undefined;

    if (arrayIncludes(array, value)) {
      expectTypeOf(value).toEqualTypeOf<string | undefined>();
    }

    const nullableTuple = ['a', null] as const;
    const unknownValue: unknown = null;
    if (arrayIncludes(nullableTuple, unknownValue)) {
      expectTypeOf(unknownValue).toEqualTypeOf<'a' | null>();
    }
  });

  it('does not narrow a value that already has the element type', () => {
    const names: string[] = [];
    const name = 'a' as string;

    expectTypeOf(arrayIncludes(names, name)).toEqualTypeOf<boolean>();
    if (arrayIncludes(names, name)) {
      expectTypeOf(name).toEqualTypeOf<string>();
    }

    if (!arrayIncludes(names, name)) {
      expectTypeOf(name).toEqualTypeOf<string>();
    }
  });
});
