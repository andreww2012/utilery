import {slidingWindow} from '../../src/iterable/sliding-window.ts';
import {EXPLICIT_UNDEFINED} from '../exact-optional-property-types.ts';

describe('iterable/slidingWindow', () => {
  it('gives tuples for a literal size', () => {
    expectTypeOf(slidingWindow([1, 2, 3], 2)).toEqualTypeOf<
      Generator<[number, number], void, unknown>
    >();
    expectTypeOf(slidingWindow(new Set(['a', 'b']), 3, 2)).toEqualTypeOf<
      Generator<[string, string, string], void, unknown>
    >();
    expectTypeOf(slidingWindow([1, 2, 3], 2 as 1 | 2)).toEqualTypeOf<
      Generator<[number] | [number, number], void, unknown>
    >();

    for (const [previous, current] of slidingWindow([1, 4, 9], 2)) {
      expectTypeOf(previous).toEqualTypeOf<number>();
      expectTypeOf(current).toEqualTypeOf<number>();
    }
  });

  it('gives tuples when partial windows are off', () => {
    const expected = slidingWindow(['a'], 2);

    expectTypeOf(slidingWindow(['a'], 2, 1, {})).toEqualTypeOf(expected);
    expectTypeOf(slidingWindow(['a'], 2, 1, {partialWindows: false})).toEqualTypeOf(expected);
    expectTypeOf(slidingWindow(['a'], 2, 1, {partialWindows: EXPLICIT_UNDEFINED})).toEqualTypeOf(
      expected,
    );
  });

  it('gives arrays when windows may be shorter than the size', () => {
    const shouldYieldPartialWindows = true as boolean;

    expectTypeOf(slidingWindow([1, 2, 3], 2, 1, {partialWindows: true})).toEqualTypeOf<
      Generator<number[], void, unknown>
    >();
    expectTypeOf(
      slidingWindow([1, 2, 3], 2, 1, {partialWindows: shouldYieldPartialWindows}),
    ).toEqualTypeOf<Generator<number[], void, unknown>>();
  });

  it('gives arrays for a non-literal size or one too big for a tuple type', () => {
    const size = 2 as number;

    expectTypeOf(slidingWindow([1, 2, 3], size)).toEqualTypeOf<
      Generator<number[], void, unknown>
    >();
    expectTypeOf(slidingWindow([1, 2, 3], 10_000)).toEqualTypeOf<
      Generator<number[], void, unknown>
    >();
  });

  it('accepts readonly arrays and tuples', () => {
    const tuple = [1, 'a'] as const;

    expectTypeOf(slidingWindow(tuple, 2)).toEqualTypeOf<
      Generator<[1 | 'a', 1 | 'a'], void, unknown>
    >();
  });
});
