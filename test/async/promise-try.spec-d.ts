import {promiseTry} from '../../src/async/promise-try.ts';

describe('async/promiseTry', () => {
  it('infers the result type', () => {
    expectTypeOf(promiseTry(() => Promise.resolve('a'))).toEqualTypeOf<Promise<string>>();
    expectTypeOf(promiseTry((value: number) => value, 1)).toEqualTypeOf<Promise<number>>();
  });
});
