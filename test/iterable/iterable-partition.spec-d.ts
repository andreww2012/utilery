import {iterablePartition} from '../../src/iterable/iterable-partition.ts';

describe('iterable/iterablePartition', () => {
  it('narrows both arrays with a type guard', () => {
    expectTypeOf(iterablePartition([1, 'a'], (value) => typeof value === 'number')).toEqualTypeOf<
      [matched: number[], unmatched: string[]]
    >();
  });
});
