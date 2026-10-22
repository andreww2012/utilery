// Values of known types are passed on purpose, to check the runtime result
/* eslint-disable ts/no-unnecessary-condition */
import {isAbortError} from '../../src/predicate/is-abort-error.ts';
import {isTimeoutError} from '../../src/predicate/is-timeout-error.ts';

describe('predicate/isAbortError, predicate/isTimeoutError', () => {
  it('detects abort errors', async () => {
    const error = await fetch('https://example.com', {signal: AbortSignal.abort()}).catch(
      (error_: unknown) => error_,
    );

    expect(isAbortError(error)).toBe(true);
    expect(isAbortError(new DOMException('x', 'AbortError'))).toBe(true);
    expect(isTimeoutError(error)).toBe(false);
  });

  it('detects timeout errors', () => {
    const controller = new AbortController();
    controller.abort(new DOMException('x', 'TimeoutError'));

    expect(isTimeoutError(controller.signal.reason)).toBe(true);
    expect(isAbortError(controller.signal.reason)).toBe(false);
  });

  it('rejects other values', () => {
    expect(isAbortError(new Error('x'))).toBe(false);
    expect(isAbortError({name: 'AbortError'})).toBe(false);
    expect(isTimeoutError('TimeoutError')).toBe(false);
  });
});
