import {arrayHasMaxElements} from '../../src/array/array-has-max-elements.ts';

// The narrowed types here are unions of tuples, which `expectTypeOf(value)` brands
// structurally member by member, which takes ~300s to typecheck, versus ~1s for the
// `expectTypeOf<typeof value>()` form below
describe('array/arrayHasMaxElements', () => {
  it('narrows a regular array to every length that remains possible', () => {
    const values: number[] = [1, 2];

    if (arrayHasMaxElements(values, 2)) {
      expectTypeOf<typeof values>().toEqualTypeOf<[] | [number] | [number, number]>();
    }
  });

  it('keeps the element type of each position', () => {
    const pair: [string, ...number[]] = ['a', 1];

    if (arrayHasMaxElements(pair, 2)) {
      expectTypeOf<typeof pair>().toEqualTypeOf<[string] | [string, number]>();
    }
  });

  it('preserves readonly when narrowing', () => {
    const values: readonly string[] = ['a'];

    if (arrayHasMaxElements(values, 1)) {
      expectTypeOf<typeof values>().toEqualTypeOf<readonly [] | readonly [string]>();
    }
  });

  it('narrows to `never` when the array can never be that short', () => {
    const triple: [string, number, boolean] = ['a', 1, true];

    if (arrayHasMaxElements(triple, 2)) {
      expectTypeOf<typeof triple>().toBeNever();
    }
  });

  it('returns a plain boolean for a non-literal maximum', () => {
    const maximum = Math.max(2, 3); // non-literal `number`

    expectTypeOf(arrayHasMaxElements([1, 2, 3], maximum)).toEqualTypeOf<boolean>();
  });

  it('returns a plain boolean for a maximum that is not a single non-negative integer', () => {
    const values: string[] = ['a', 'b', 'c'];
    const maximum = 3 as 1 | 3;

    expectTypeOf(arrayHasMaxElements(values, maximum)).toEqualTypeOf<boolean>();
    if (arrayHasMaxElements(values, maximum)) {
      expectTypeOf(values).toEqualTypeOf<string[]>();
    }

    expectTypeOf(arrayHasMaxElements(values, 1.5)).toEqualTypeOf<boolean>();
    expectTypeOf(arrayHasMaxElements(values, -1)).toEqualTypeOf<boolean>();
  });
});
