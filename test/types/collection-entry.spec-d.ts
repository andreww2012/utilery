import type {CollectionEntry} from '../../src/types/collection-entry.ts';

describe('types/CollectionEntry', () => {
  it('basic test', () => {
    expectTypeOf<CollectionEntry<{a: 1}>>().toEqualTypeOf<['a', 1]>();
  });

  it('gives the union of the keys and the union of the values for an object type', () => {
    expectTypeOf<CollectionEntry<{a: number; b: string}>>().toEqualTypeOf<
      ['a' | 'b', number | string]
    >();
  });
});
