import {mapMapValues} from '../../src/map/map-map-values.ts';

describe('map/mapMapValues', () => {
  it('basic test', () => {
    const result = mapMapValues(
      new Map([
        ['a', 1],
        ['b', 2],
      ]),
      (value) => value * 10,
    );

    expect([...result]).toStrictEqual([
      ['a', 10],
      ['b', 20],
    ]);
  });

  it('accepts a `ReadonlyMap`', () => {
    const sample: ReadonlyMap<string, number> = new Map([
      ['a', 1],
      ['b', 2],
    ]);

    expect([...mapMapValues(sample, (value) => value * 10)]).toStrictEqual([
      ['a', 10],
      ['b', 20],
    ]);
  });
});
