import {arrayMapWithAccumulator} from '../../src/array/array-map-with-accumulator.ts';

describe('array/arrayMapWithAccumulator', () => {
  it('preserves the tuple length, with the accumulator type at each position', () => {
    expectTypeOf(
      arrayMapWithAccumulator([1, 2, 3] as const, (accumulator, value) => accumulator + value, 0),
    ).toEqualTypeOf<[number, number, number]>();
  });

  it('widens a regular array to `Accumulator[]`', () => {
    expectTypeOf(
      arrayMapWithAccumulator([1, 2, 3], (accumulator, value) => `${accumulator}${value}`, ''),
    ).toEqualTypeOf<string[]>();
  });

  it('types the callback parameters', () => {
    arrayMapWithAccumulator(
      ['a', 'b'] as const,
      (accumulator, value, _index, array) => {
        expectTypeOf(accumulator).toEqualTypeOf<number>();
        expectTypeOf(value).toEqualTypeOf<'a' | 'b'>();
        expectTypeOf(array).toEqualTypeOf<readonly ['a', 'b']>();
        return accumulator;
      },
      0,
    );
  });
});
