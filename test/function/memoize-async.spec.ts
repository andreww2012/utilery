import {sleep} from '../../src/async/sleep.ts';
import {memoizeAsync} from '../../src/function/memoize-async.ts';

describe('function/memoizeAsync', () => {
  it('runs once per key, sharing pending calls', async () => {
    const fn = vi.fn<(id: string) => Promise<string>>(async (id) => {
      await sleep(5);
      return `user ${id}`;
    });
    const memoized = memoizeAsync(fn);

    await expect(Promise.all([memoized('1'), memoized('1'), memoized('2')])).resolves.toStrictEqual(
      ['user 1', 'user 1', 'user 2'],
    );

    await memoized('1');

    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('does not cache rejections', async () => {
    let calls = 0;
    const fn = vi.fn<() => Promise<string>>(() =>
      ++calls === 1 ? Promise.reject(new Error('first')) : Promise.resolve('second'),
    );
    const memoized = memoizeAsync(fn);

    await expect(memoized()).rejects.toThrow('first');
    await expect(memoized()).resolves.toBe('second');
  });

  it('supports the options', async () => {
    const fn = vi.fn<(a: number, b: number) => Promise<number>>((a, b) => Promise.resolve(a + b));
    const memoized = memoizeAsync(fn, {
      cacheKey: (callArguments) => callArguments.join(','),
      shouldCache: (sum) => sum > 0,
    });

    await memoized(1, 2);
    await memoized(1, 2);
    await memoized(0, 0);
    await memoized(0, 0);

    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('clears the cache', async () => {
    const fn = vi.fn<() => Promise<number>>(() => Promise.resolve(1));
    const memoized = memoizeAsync(fn);
    await memoized();
    memoized.clear();
    await memoized();

    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('clears nothing without a cache', async () => {
    const memoized = memoizeAsync((value: number) => Promise.resolve(value), {cache: false});
    await memoized(1);

    expect(() => {
      memoized.clear();
    }).not.toThrow();
  });
});
