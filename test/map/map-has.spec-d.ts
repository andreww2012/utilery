import {mapHas} from '../../src/map/map-has.ts';

const LABELS = new Map([
  ['s', 'Small'],
  ['m', 'Medium'],
] as const);

describe('map/mapHas', () => {
  it('narrows a key of a wider type to the key type of the map', () => {
    const input = 's' as string;

    if (mapHas(LABELS, input)) {
      expectTypeOf(input).toEqualTypeOf<'s' | 'm'>();
    } else {
      expectTypeOf(input).toEqualTypeOf<string>();
    }

    const value: unknown = 's';

    if (mapHas(LABELS, value)) {
      expectTypeOf(value).toEqualTypeOf<'s' | 'm'>();
    } else {
      expectTypeOf(value).toEqualTypeOf<unknown>();
    }
  });

  it('narrows nothing when the key already has the key type of the map', () => {
    const counts = new Map<string, number>();
    const word = 'a' as string;

    expectTypeOf(mapHas(counts, word)).toEqualTypeOf<boolean>();

    if (!mapHas(counts, word)) {
      expectTypeOf(word).toEqualTypeOf<string>();
    }
  });

  it('drops the union members that the key type covers when it returns `false`', () => {
    const counts = new Map<string, number>();
    const key = 'a' as string | undefined;

    if (mapHas(counts, key)) {
      expectTypeOf(key).toEqualTypeOf<string>();
    } else {
      expectTypeOf(key).toEqualTypeOf<undefined>();
    }
  });

  it('keeps `null` and `undefined` of the key type', () => {
    const map = new Map<string | null | undefined, number>();
    const key: unknown = null;

    if (mapHas(map, key)) {
      expectTypeOf(key).toEqualTypeOf<string | null | undefined>();
    }
  });

  it('accepts a `ReadonlyMap`', () => {
    const map: ReadonlyMap<'a' | 'b', number> = new Map();
    const key = 'a' as string;

    if (mapHas(map, key)) {
      expectTypeOf(key).toEqualTypeOf<'a' | 'b'>();
    }
  });

  it('rejects a key of an unrelated type', () => {
    // @ts-expect-error a number is never a key of a map with string keys
    mapHas(new Map<string, number>(), 1);
  });
});
