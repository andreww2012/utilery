import {mapHasValue} from '../../src/map/map-has-value.ts';

describe('map/mapHasValue', () => {
  it('basic test', () => {
    const sample = new Map([
      ['a', 1],
      ['b', 2],
    ]);

    expect(mapHasValue(sample, 2)).toBe(true);
    expect(mapHasValue(sample, 99)).toBe(false);
  });

  it('accepts a `ReadonlyMap`', () => {
    const sample: ReadonlyMap<string, number> = new Map([
      ['a', 1],
      ['b', 2],
    ]);

    expect(mapHasValue(sample, 2)).toBe(true);
  });
});
