import {createSingletonPromise} from '../../src/async/create-singleton-promise.ts';
import {sleep} from '../../src/async/sleep.ts';

describe('async/createSingletonPromise', () => {
  it('shares one promise between calls', async () => {
    let calls = 0;
    const singleton = createSingletonPromise(async () => {
      calls += 1;
      await sleep(5);
      return 'value';
    });

    const [first, second] = await Promise.all([singleton(), singleton()]);

    expect([first, second]).toStrictEqual(['value', 'value']);
    expect(singleton()).toBe(singleton());

    await singleton();

    expect(calls).toBe(1);
  });

  it('calls again after a rejection', async () => {
    let calls = 0;
    const singleton = createSingletonPromise(() => {
      calls += 1;
      if (calls === 1) {
        throw new Error('first');
      }

      return 'second';
    });

    await expect(singleton()).rejects.toThrow('first');
    await expect(singleton()).resolves.toBe('second');
  });

  it('keeps rejections with `cacheRejections`', async () => {
    let calls = 0;
    const singleton = createSingletonPromise(
      () => {
        calls += 1;
        return Promise.reject(new Error('failed'));
      },
      {cacheRejections: true},
    );

    await expect(singleton()).rejects.toThrow('failed');
    await expect(singleton()).rejects.toThrow('failed');

    expect(calls).toBe(1);
  });

  it('refreshes a value older than `ttl`', async () => {
    let calls = 0;
    const singleton = createSingletonPromise(() => ++calls, {ttl: 20});

    await expect(singleton()).resolves.toBe(1);
    await expect(singleton()).resolves.toBe(1);

    await sleep(30);

    await expect(singleton()).resolves.toBe(2);
  });

  it('forgets the promise on `reset`, waiting for it to settle', async () => {
    let calls = 0;
    const singleton = createSingletonPromise(() => ++calls);
    await singleton();
    await singleton.reset();

    await expect(singleton()).resolves.toBe(2);

    const failing = createSingletonPromise(() => Promise.reject(new Error('x')));
    const rejected = failing().catch(() => undefined);

    await expect(failing.reset()).resolves.toBeUndefined();

    await rejected;
  });
});
