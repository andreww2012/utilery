import {iterablePartition} from '../../src/iterable/iterable-partition.ts';
import {isValidDate} from '../../src/predicate/is-valid-date.ts';

describe('iterable/iterablePartition', () => {
  it('narrows both arrays with a type guard', () => {
    expectTypeOf(iterablePartition([1, 'a'], (value) => typeof value === 'number')).toEqualTypeOf<
      [matched: number[], unmatched: string[]]
    >();
  });

  it('keeps the element type in both arrays when the elements already have the narrowed type', () => {
    expectTypeOf(iterablePartition([new Date()], isValidDate)).toEqualTypeOf<
      [matched: Date[], unmatched: Date[]]
    >();
  });
});
