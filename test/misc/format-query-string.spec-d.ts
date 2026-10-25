import {formatQueryString} from '../../src/misc/format-query-string.ts';

interface SearchParams {
  q: string;
  page?: number;
  tags: readonly string[];
}

declare const searchParams: SearchParams;

describe('misc/formatQueryString', () => {
  it('accepts interfaces, optional properties and readonly arrays', () => {
    expectTypeOf(formatQueryString(searchParams)).toEqualTypeOf<string>();
    expectTypeOf(
      formatQueryString({tags: ['a', null, undefined] as const}),
    ).toEqualTypeOf<string>();
  });

  it('rejects values that are not primitives or arrays of them', () => {
    // @ts-expect-error -- a nested object is not a query value
    formatQueryString({filter: {a: 1}});
    // @ts-expect-error -- a nested array is not a query value
    formatQueryString({a: [[1]]});
  });
});
