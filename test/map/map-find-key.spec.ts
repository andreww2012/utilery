import {mapFindKey} from '../../src/map/map-find-key.ts';

describe('map/mapFindKey', () => {
  it('basic test', () => {
    const sample = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);

    expect(mapFindKey(sample, (value) => value === 2)).toBe('b');
    expect(mapFindKey(sample, (value) => value > 10)).toBeUndefined();
  });

  it('accepts a `ReadonlyMap`', () => {
    const sample: ReadonlyMap<string, number> = new Map([
      ['a', 1],
      ['b', 2],
    ]);

    expect(mapFindKey(sample, (value) => value === 2)).toBe('b');
  });
});
