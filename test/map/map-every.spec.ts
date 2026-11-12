import {mapEvery} from '../../src/map/map-every.ts';

describe('map/mapEvery', () => {
  it('basic test', () => {
    const sample = new Map([
      ['a', 2],
      ['b', 4],
    ]);

    expect(mapEvery(sample, (value) => value % 2 === 0)).toBe(true);
    expect(mapEvery(sample, (value) => value > 2)).toBe(false);
  });

  it('accepts a `ReadonlyMap`', () => {
    const sample: ReadonlyMap<string, number> = new Map([
      ['a', 1],
      ['b', 2],
    ]);

    expect(mapEvery(sample, (value) => value > 0)).toBe(true);
  });
});
