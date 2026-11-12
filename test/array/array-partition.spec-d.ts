import {arrayPartition} from '../../src/array/array-partition.ts';
import {isValidDate} from '../../src/predicate/is-valid-date.ts';

describe('array/arrayPartition', () => {
  it('narrows both arrays with a type guard', () => {
    const mixed: (string | number)[] = ['a', 1];

    expectTypeOf(arrayPartition(mixed, (value) => typeof value === 'string')).toEqualTypeOf<
      [matched: string[], unmatched: number[]]
    >();
  });

  it('keeps the element type in both arrays when the elements already have the narrowed type', () => {
    const dates = [new Date(), new Date('not a date')];

    expectTypeOf(arrayPartition(dates, isValidDate)).toEqualTypeOf<
      [matched: Date[], unmatched: Date[]]
    >();
  });
});
