import {isAbortError} from '../../src/predicate/is-abort-error.ts';

describe('predicate/isAbortError', () => {
  it('narrows a caught value to an error named `AbortError`', () => {
    const error: unknown = new Error('a');

    if (isAbortError(error)) {
      expectTypeOf(error).toEqualTypeOf<Error & {name: 'AbortError'}>();
    } else {
      expectTypeOf(error).toEqualTypeOf<unknown>();
    }
  });

  it('keeps other errors in the `false` branch', () => {
    const error = new Error('a');

    if (!isAbortError(error)) {
      expectTypeOf(error).toEqualTypeOf<Error>();
    }
  });

  it('keeps the members of a union in the `false` branch', () => {
    const error = undefined as Error | undefined;

    if (!isAbortError(error)) {
      expectTypeOf(error).toEqualTypeOf<Error | undefined>();
    }
  });
});
