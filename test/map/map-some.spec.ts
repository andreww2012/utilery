import {mapSome} from '../../src/map/map-some.ts';

describe('map/mapSome', () => {
  it('basic test', () => {
    const sample = new Map([
      ['a', 1],
      ['b', 2],
    ]);

    expect(mapSome(sample, (value) => value === 2)).toBe(true);
    expect(mapSome(sample, (value) => value > 10)).toBe(false);
  });

  it('accepts a `ReadonlyMap`', () => {
    const sample: ReadonlyMap<string, number> = new Map([
      ['a', 1],
      ['b', 2],
    ]);

    expect(mapSome(sample, (value) => value > 1)).toBe(true);
  });
});
