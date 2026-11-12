import {arrayJoin} from '../../src/array/array-join.ts';

describe('array/arrayJoin', () => {
  it('gives the joined literal for literal elements and a literal delimiter', () => {
    expectTypeOf(arrayJoin(['a', 'b', 'c'], '.')).toEqualTypeOf<'a.b.c'>();
    expectTypeOf(
      arrayJoin(['a', 1, null, true, undefined, 2n], '-'),
    ).toEqualTypeOf<'a-1--true--2'>();
    expectTypeOf(arrayJoin(['a', 'b'] as readonly ['a', 'b'], '')).toEqualTypeOf<'ab'>();
  });

  it('joins with a comma without a delimiter', () => {
    expectTypeOf(arrayJoin(['a', 'b', 'c'])).toEqualTypeOf<'a,b,c'>();
    expectTypeOf(arrayJoin(['a', 'b'], undefined)).toEqualTypeOf<'a,b'>();
  });

  it('gives a `string` when the number of elements is unknown', () => {
    expectTypeOf(arrayJoin([] as string[], ', ')).toEqualTypeOf<string>();
    expectTypeOf(arrayJoin([] as readonly number[])).toEqualTypeOf<string>();
    expectTypeOf(arrayJoin(['a'] as ['a', 'b'?], '.')).toEqualTypeOf<string>();
    expectTypeOf(arrayJoin(['a'] as ['a', ...'b'[]], '.')).toEqualTypeOf<string>();
  });

  it('gives a `string` for a delimiter that is not a literal', () => {
    expectTypeOf(arrayJoin(['a', 'b'], '-' as string)).toEqualTypeOf<`a${string}b`>();
  });

  it('accepts elements with no literal form and gives a `string`', () => {
    expectTypeOf(arrayJoin([new Date(0), 'b'], ' | ')).toEqualTypeOf<string>();
    expectTypeOf(arrayJoin([{a: 1}, ['b']])).toEqualTypeOf<string>();
    expectTypeOf(arrayJoin([] as unknown[])).toEqualTypeOf<string>();
  });

  it('rejects an array that may have a `symbol` element', () => {
    // @ts-expect-error joining a `symbol` throws
    arrayJoin([Symbol('a'), 'b'], '.');
    // @ts-expect-error joining a `symbol` throws
    arrayJoin([] as (symbol | string)[]);
  });
});
