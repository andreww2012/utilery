import {mapTimes} from '../../src/function/map-times.ts';

describe('function/mapTimes', () => {
  it('invokes the iteratee with each index and collects the results', () => {
    expect(mapTimes(3, (index) => index * 2)).toStrictEqual([0, 2, 4]);
  });

  it('can build a fixed-size array of a constant value', () => {
    expect(mapTimes(2, () => 'utilery')).toStrictEqual(['utilery', 'utilery']);
  });

  it('returns an empty array for a count of zero or below', () => {
    expect(mapTimes(0, (index) => index)).toStrictEqual([]);
    expect(mapTimes(-3, (index) => index)).toStrictEqual([]);
  });
});
