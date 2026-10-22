import {withTimeout} from '../../src/async/with-timeout.ts';
import {isTimeoutError} from '../../src/predicate/is-timeout-error.ts';

const never = () =>
  new Promise<never>(() => {
    // never settles
  });

describe('async/withTimeout', () => {
  it('resolves with the result in time', async () => {
    await expect(withTimeout(() => Promise.resolve(42), 50)).resolves.toBe(42);
    await expect(withTimeout(() => 'sync', 50)).resolves.toBe('sync');
  });

  it('rejects with a `TimeoutError` and aborts the signal', async () => {
    let signal: AbortSignal | undefined;
    const error = await withTimeout((signal_) => {
      signal = signal_;
      return never();
    }, 10).catch((error_: unknown) => error_);

    expect(isTimeoutError(error)).toBe(true);
    expect(signal?.aborted).toBe(true);
    expect(signal?.reason).toBe(error);
  });

  it('rejects when the given signal is aborted', async () => {
    const controller = new AbortController();
    const promise = withTimeout(never, 1000, {signal: controller.signal});
    controller.abort(new Error('cancelled'));

    await expect(promise).rejects.toThrow('cancelled');
    await expect(withTimeout(never, 1000, {signal: AbortSignal.abort()})).rejects.toMatchObject({
      name: 'AbortError',
    });
  });

  it('passes errors through', async () => {
    await expect(
      withTimeout(() => {
        throw new Error('failed');
      }, 50),
    ).rejects.toThrow('failed');
  });
});
