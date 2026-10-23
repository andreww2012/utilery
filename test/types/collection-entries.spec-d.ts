import type {CollectionEntries} from '../../src/types/collection-entries.ts';

describe('types/CollectionEntries', () => {
  it('basic test', () => {
    expectTypeOf<CollectionEntries<{a: 1}>>().toEqualTypeOf<['a', 1][]>();
  });

  it('gives the union of the keys and the union of the values for an object type', () => {
    expectTypeOf<CollectionEntries<{a: number; b: string}>>().toEqualTypeOf<
      ['a' | 'b', number | string][]
    >();
  });
});
