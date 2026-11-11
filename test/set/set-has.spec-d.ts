import {setHas} from '../../src/set/set-has.ts';

describe('set/setHas', () => {
  it('narrows a wider value to the element type, but only when it returns `true`', () => {
    const colors = new Set(['red', 'green'] as const);
    const input = 'red' as string;

    if (setHas(colors, input)) {
      expectTypeOf(input).toEqualTypeOf<'red' | 'green'>();
    } else {
      expectTypeOf(input).toEqualTypeOf<string>();
    }

    const unknownInput: unknown = 'red';
    if (setHas(colors, unknownInput)) {
      expectTypeOf(unknownInput).toEqualTypeOf<'red' | 'green'>();
    } else {
      expectTypeOf(unknownInput).toEqualTypeOf<unknown>();
    }
  });

  it('keeps `null` and `undefined` when the set may hold them', () => {
    const set: ReadonlySet<string | undefined> = new Set([undefined, 'a']);
    const value = undefined as string | undefined;

    if (setHas(set, value)) {
      expectTypeOf(value).toEqualTypeOf<string | undefined>();
    }

    const nullableSet: ReadonlySet<'a' | null> = new Set([null]);
    const unknownValue: unknown = null;
    if (setHas(nullableSet, unknownValue)) {
      expectTypeOf(unknownValue).toEqualTypeOf<'a' | null>();
    }
  });

  it('does not narrow a value that already has the element type', () => {
    const seen = new Set<string>();
    const name = 'a' as string;

    expectTypeOf(setHas(seen, name)).toEqualTypeOf<boolean>();
    if (setHas(seen, name)) {
      expectTypeOf(name).toEqualTypeOf<string>();
    }

    if (!setHas(seen, name)) {
      expectTypeOf(name).toEqualTypeOf<string>();
    }
  });

  it('accepts a readonly set', () => {
    const set: ReadonlySet<number> = new Set([1]);

    expectTypeOf(setHas(set, 1)).toEqualTypeOf<boolean>();
  });
});
