import type {TupleOf} from '../../src/types/tuple-of.ts';

describe('types/TupleOf', () => {
  it('basic test', () => {
    expectTypeOf<TupleOf<2, number>>().toEqualTypeOf<[number, number]>();
  });

  it('gives an array type for the wide `number` type', () => {
    expectTypeOf<TupleOf<number, string>>().toEqualTypeOf<string[]>();
  });

  it('gives a tuple type for each member of a union', () => {
    expectTypeOf<TupleOf<1 | 2, 0>>().toEqualTypeOf<[0] | [0, 0]>();
    expectTypeOf<TupleOf<1 | 10_000, 0>>().toEqualTypeOf<[0] | 0[]>();
  });

  it('ignores the decimal part of the length', () => {
    expectTypeOf<TupleOf<2.75, 0>>().toEqualTypeOf<[0, 0]>();
    expectTypeOf<TupleOf<1.2345, 0>>().toEqualTypeOf<[0]>();
    expectTypeOf<TupleOf<12.25, 0>['length']>().toEqualTypeOf<12>();
    expectTypeOf<TupleOf<9999.5, 0>['length']>().toEqualTypeOf<9999>();
    expectTypeOf<TupleOf<10_000.5, 0>>().toEqualTypeOf<0[]>();
  });

  it('gives an empty tuple type for a negative length', () => {
    expectTypeOf<TupleOf<-3, 0>>().toEqualTypeOf<[]>();
  });

  it('gives an array type for a length too large for a tuple, instead of failing', () => {
    expectTypeOf<TupleOf<9999, 0>['length']>().toEqualTypeOf<9999>();
    expectTypeOf<TupleOf<10_000, 0>>().toEqualTypeOf<0[]>();
    expectTypeOf<TupleOf<1_000_000, 0>>().toEqualTypeOf<0[]>();
  });

  it('switches to an array type at the length where TypeScript fails', () => {
    expectTypeOf<[...TupleOf<5000, 0>, ...TupleOf<4999, 0>]['length']>().toEqualTypeOf<9999>();
    // If this compiles, TypeScript allows longer tuples: update the limit in `TupleOf` and its docs
    // @ts-expect-error TypeScript can't represent a tuple type of 10 000 elements
    expectTypeOf<[...TupleOf<5000, 0>, ...TupleOf<5000, 0>]>().toBeArray();
  });

  it('keeps how `never` and `any` lengths behave', () => {
    expectTypeOf<TupleOf<never, 0>>().toEqualTypeOf<[]>();
    // eslint-disable-next-line ts/no-explicit-any -- testing `any`
    expectTypeOf<TupleOf<any, 0>>().toEqualTypeOf<0[]>();
  });
});
