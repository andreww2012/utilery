import {isTimeoutError} from '../../src/predicate/is-timeout-error.ts';

describe('predicate/isTimeoutError', () => {
  it('narrows a caught value to an error named `TimeoutError`', () => {
    const error: unknown = new Error('a');

    if (isTimeoutError(error)) {
      expectTypeOf(error).toEqualTypeOf<Error & {name: 'TimeoutError'}>();
    } else {
      expectTypeOf(error).toEqualTypeOf<unknown>();
    }
  });

  it('keeps other errors in the `false` branch', () => {
    const error = new Error('a');

    if (!isTimeoutError(error)) {
      expectTypeOf(error).toEqualTypeOf<Error>();
    }
  });

  it('keeps the members of a union in the `false` branch', () => {
    const error = undefined as Error | undefined;

    if (!isTimeoutError(error)) {
      expectTypeOf(error).toEqualTypeOf<Error | undefined>();
    }
  });
});
