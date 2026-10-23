import type {IntClosedRange} from 'type-fest';

/**
 * The union of the integers from `Start` to `End`, both inclusive, with a step
 * of `Step`.
 * `Start` and `End` must be from `-998` to `998`, and `Start` greater than
 * `End` gives `never`.
 * For an exclusive `End`, use `IntRange`.
 * @example
 * type A = IntRangeClosed<0, 5>;
 * //=> 0 | 1 | 2 | 3 | 4 | 5
 * type B = IntRangeClosed<0, 10, 2>;
 * //=> 0 | 2 | 4 | 6 | 8 | 10
 * type C = IntRangeClosed<-2, 2>;
 * //=> -2 | -1 | 0 | 1 | 2
 */
export type IntRangeClosed<
  Start extends number,
  End extends number,
  Step extends number = 1,
> = IntClosedRange<Start, End, Step>;
