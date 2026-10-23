import {withMaxArity} from '../../src/function/with-max-arity.ts';

describe('function/withMaxArity', () => {
  it('returns a function that takes anything and keeps the return type', () => {
    expectTypeOf(withMaxArity((value: string) => value.length, 1)).toEqualTypeOf<
      (...parameters: any[]) => number
    >();
  });
});
