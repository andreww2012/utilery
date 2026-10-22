import {withAbortSignal} from '../../src/async/with-abort-signal.ts';

describe('async/withAbortSignal', () => {
  it('settles like the promise when not aborted', async () => {
    const controller = new AbortController();

    await expect(withAbortSignal(Promise.resolve(1), controller.signal)).resolves.toBe(1);
    await expect(
      withAbortSignal(Promise.reject(new Error('failed')), controller.signal),
    ).rejects.toThrow('failed');
    await expect(withAbortSignal(Promise.resolve(2))).resolves.toBe(2);
  });

  it('rejects with the reason when aborted first', async () => {
    const controller = new AbortController();
    const promise = withAbortSignal(
      new Promise(() => {
        // never settles
      }),
      controller.signal,
    );
    controller.abort(new Error('stopped'));

    await expect(promise).rejects.toThrow('stopped');
  });

  it('rejects right away for an aborted signal', async () => {
    await expect(withAbortSignal(Promise.resolve(1), AbortSignal.abort())).rejects.toMatchObject({
      name: 'AbortError',
    });
  });
});
