import {arrayMapWithAccumulator} from '../../src/array/array-map-with-accumulator.ts';

describe('array/arrayMapWithAccumulator', () => {
  it('returns the successive accumulator values (running sum)', () => {
    expect(
      arrayMapWithAccumulator([1, 2, 3, 4], (accumulator, value) => accumulator + value, 0),
    ).toStrictEqual([1, 3, 6, 10]);
  });

  it('passes the accumulator, value, index, and the source array to the callback', () => {
    const source = [10, 20];
    const calls: [number, number, number, number[]][] = [];

    arrayMapWithAccumulator(
      source,
      (accumulator, value, index, array) => {
        calls.push([accumulator, value, index, array]);
        return accumulator + value;
      },
      0,
    );

    expect(calls).toStrictEqual([
      [0, 10, 0, source],
      [10, 20, 1, source],
    ]);
    expect(calls[0]?.[3]).toBe(source);
  });

  it('returns an empty array for an empty input', () => {
    expect(arrayMapWithAccumulator([], (accumulator: number) => accumulator, 0)).toStrictEqual([]);
  });

  it('does not mutate the input', () => {
    const source = [1, 2, 3];
    arrayMapWithAccumulator(source, (accumulator, value) => accumulator + value, 0);

    expect(source).toStrictEqual([1, 2, 3]);
  });
});
