import {promiseTry} from '../../src/async/promise-try.ts';
import {describeWithAndWithoutNative} from '../describe-with-and-without-native.ts';

describe('async/promiseTry', () => {
  describeWithAndWithoutNative(
    Promise,
    'try',
    function (
      this: PromiseConstructor,
      fn: (...parameters: unknown[]) => unknown,
      ...callArguments: unknown[]
    ) {
      return new this((resolve) => {
        resolve(fn(...callArguments));
      });
    },
    () => {
      it('resolves with the result of a sync or async function', async () => {
        await Promise.all([
          expect(promiseTry(() => 1)).resolves.toBe(1),
          expect(promiseTry(() => Promise.resolve(2))).resolves.toBe(2),
          expect(promiseTry((a: number, b: number) => a + b, 1, 2)).resolves.toBe(3),
        ]);
      });

      it('turns a synchronous throw into a rejection', async () => {
        const promise = promiseTry(() => {
          throw new Error('sync');
        });

        await expect(promise).rejects.toThrow('sync');
      });

      it('turns a rejected promise into a rejection', async () => {
        await expect(promiseTry(() => Promise.reject(new Error('async')))).rejects.toThrow('async');
      });

      it('calls the function synchronously', () => {
        let isCalled = false;
        void promiseTry(() => {
          isCalled = true;
        });

        expect(isCalled).toBe(true);
      });
    },
  );
});
