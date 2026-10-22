import {sleepAbortable} from '../../src/async/sleep-abortable.ts';

describe('async/sleepAbortable', () => {
  it('waits for the given time', async () => {
    const start = Date.now();
    await sleepAbortable(20);

    expect(Date.now() - start).toBeGreaterThanOrEqual(15);
  });

  it('rejects with the reason when aborted', async () => {
    const controller = new AbortController();
    const promise = sleepAbortable(1000, {signal: controller.signal});
    controller.abort();

    await expect(promise).rejects.toMatchObject({name: 'AbortError'});
    await expect(sleepAbortable(10, {signal: AbortSignal.abort('reason')})).rejects.toBe('reason');
  });

  it('can unref the timer', async () => {
    const unref = vi.fn<() => void>();
    const setTimeoutSpy = vi
      .spyOn(globalThis, 'setTimeout')
      .mockImplementationOnce((callback: () => void) => {
        queueMicrotask(callback);
        return {unref} as unknown as NodeJS.Timeout;
      });

    await sleepAbortable(1000, {unref: true});

    expect(unref).toHaveBeenCalledOnce();

    setTimeoutSpy.mockRestore();
  });
});
