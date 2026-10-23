import {promiseTry} from '../../src/async/promise-try.ts';

describe('async/promiseTry', () => {
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

  it('calls the function synchronously', () => {
    let isCalled = false;
    void promiseTry(() => {
      isCalled = true;
    });

    expect(isCalled).toBe(true);
  });
});
