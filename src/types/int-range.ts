import type {IntRange as IntRangeBase} from 'type-fest';

/**
 * The union of the integers from `Start` (inclusive) to `End` (exclusive),
 * with a step of `Step`.
 * `Start` and `End` must be from `-998` to `999`, and `Start` greater than
 * `End` gives `never`.
 * For an inclusive `End`, use `IntRangeClosed`.
 * @example
 * type A = IntRange<0, 5>;
 * //=> 0 | 1 | 2 | 3 | 4
 * type B = IntRange<0, 11, 2>;
 * //=> 0 | 2 | 4 | 6 | 8 | 10
 * type C = IntRange<-2, 2>;
 * //=> -2 | -1 | 0 | 1
 */
export type IntRange<
  Start extends number,
  End extends number,
  Step extends number = 1,
> = IntRangeBase<Start, End, Step>;
