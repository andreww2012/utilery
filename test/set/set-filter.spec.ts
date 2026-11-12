import {setFilter} from '../../src/set/set-filter.ts';

describe('set/setFilter', () => {
  it('basic test', () => {
    const result = setFilter(new Set([1, 2, 3, 4]), (value) => value % 2 === 0);

    expect([...result]).toStrictEqual([2, 4]);
  });

  it('accepts a `ReadonlySet`', () => {
    const sample: ReadonlySet<number> = new Set([1, 2, 3]);

    expect([...setFilter(sample, (value) => value > 1)]).toStrictEqual([2, 3]);
  });
});
