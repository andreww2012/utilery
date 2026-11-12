import {setMapValues} from '../../src/set/set-map-values.ts';

describe('set/setMapValues', () => {
  it('basic test', () => {
    const result = setMapValues(new Set([1, 2, 3]), (value) => value * 10);

    expect([...result]).toStrictEqual([10, 20, 30]);
  });

  it('accepts a `ReadonlySet`', () => {
    const sample: ReadonlySet<number> = new Set([1, 2, 3]);

    expect([...setMapValues(sample, (value) => value * 2)]).toStrictEqual([2, 4, 6]);
  });
});
