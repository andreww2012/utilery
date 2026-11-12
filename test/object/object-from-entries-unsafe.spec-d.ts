import {objectFromEntriesUnsafe} from '../../src/object/object-from-entries-unsafe.ts';

describe('object/objectFromEntriesUnsafe', () => {
  it('gives required keys for a tuple of pairs with literal keys', () => {
    expectTypeOf(
      objectFromEntriesUnsafe([
        ['a', 1],
        ['b', 'x'],
      ] as const),
    ).toEqualTypeOf<{a: 1; b: 'x'}>();
  });

  it('gives optional keys for an array of unknown length', () => {
    expectTypeOf(objectFromEntriesUnsafe([] as ['a' | 'b', number][])).toEqualTypeOf<{
      a?: number;
      b?: number;
    }>();
    expectTypeOf(objectFromEntriesUnsafe([] as readonly (readonly ['a', 1])[])).toEqualTypeOf<{
      a?: 1;
    }>();
  });

  it('gives optional keys for a tuple with a pair whose key is a union', () => {
    const key = 'a' as 'a' | 'b';

    expectTypeOf(
      objectFromEntriesUnsafe([
        [key, 1],
        ['c', 2],
      ] as const),
    ).toEqualTypeOf<{a?: 1; b?: 1; c?: 2}>();
  });

  it('gives an optional index signature for a tuple with a pair whose key is not a literal', () => {
    const key = 'a' as string;

    expectTypeOf(objectFromEntriesUnsafe([[key, 1]] as const)).toEqualTypeOf<
      Partial<Record<string, 1>>
    >();
  });

  it('types a key repeated with different values as the union of them', () => {
    expectTypeOf(
      objectFromEntriesUnsafe([
        ['a', 1],
        ['a', 'x'],
      ] as const),
    ).toEqualTypeOf<{a: 1 | 'x'}>();
  });
});
