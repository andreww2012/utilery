import {toDisposable} from '../../src/function/to-disposable.ts';

describe('function/toDisposable', () => {
  it('only gives an async disposable for an async callback', () => {
    expectTypeOf(toDisposable(() => undefined)).toEqualTypeOf<{
      [Symbol.dispose]: () => void;
      [Symbol.asyncDispose]: () => PromiseLike<void>;
    }>();
    expectTypeOf(toDisposable(() => Promise.resolve())).toEqualTypeOf<AsyncDisposable>();
  });
});
