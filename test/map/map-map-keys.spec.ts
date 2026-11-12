import {mapMapKeys} from '../../src/map/map-map-keys.ts';

describe('map/mapMapKeys', () => {
  it('basic test', () => {
    const result = mapMapKeys(
      new Map([
        ['a', 1],
        ['b', 2],
      ]),
      (_value, key) => key.toUpperCase(),
    );

    expect([...result]).toStrictEqual([
      ['A', 1],
      ['B', 2],
    ]);
  });

  it('accepts a `ReadonlyMap`', () => {
    const sample: ReadonlyMap<string, number> = new Map([
      ['a', 1],
      ['b', 2],
    ]);

    expect([...mapMapKeys(sample, (_value, key) => key.toUpperCase())]).toStrictEqual([
      ['A', 1],
      ['B', 2],
    ]);
  });
});
