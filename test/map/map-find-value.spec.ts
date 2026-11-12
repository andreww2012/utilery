import {mapFindValue} from '../../src/map/map-find-value.ts';

describe('map/mapFindValue', () => {
  it('basic test', () => {
    const sample = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);

    expect(mapFindValue(sample, (value) => value > 1)).toBe(2);
    expect(mapFindValue(sample, (value) => value > 10)).toBeUndefined();
  });

  it('accepts a `ReadonlyMap`', () => {
    const sample: ReadonlyMap<string, number> = new Map([
      ['a', 1],
      ['b', 2],
    ]);

    expect(mapFindValue(sample, (value) => value > 1)).toBe(2);
  });
});
