import {mapFilter} from '../../src/map/map-filter.ts';

describe('map/mapFilter', () => {
  it('basic test', () => {
    const sample = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);
    const result = mapFilter(sample, (value) => value > 1);

    expect([...result]).toStrictEqual([
      ['b', 2],
      ['c', 3],
    ]);
  });

  it('accepts a `ReadonlyMap`', () => {
    const sample: ReadonlyMap<string, number> = new Map([
      ['a', 1],
      ['b', 2],
    ]);

    expect([...mapFilter(sample, (value) => value > 1)]).toStrictEqual([['b', 2]]);
  });
});
