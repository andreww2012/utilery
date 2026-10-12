import {arrayChunks} from '../../src/array/array-chunks.ts';

describe('array/arrayChunks', () => {
  it('gives a tuple of chunks for a literal tuple of sizes', () => {
    expectTypeOf(arrayChunks(['a', 'b', 'c'], [1, 2])).toEqualTypeOf<[string[], string[]]>();
  });

  it('gives an array of chunks for non-literal sizes', () => {
    const sizes: number[] = [1, 2];

    expectTypeOf(arrayChunks(['a', 'b', 'c'], sizes)).toEqualTypeOf<string[][]>();
    expectTypeOf(arrayChunks(['a', 'b', 'c'], 2)).toEqualTypeOf<string[][]>();
    expectTypeOf(arrayChunks(['a', 'b', 'c'], (value) => value)).toEqualTypeOf<string[][]>();
  });
});
