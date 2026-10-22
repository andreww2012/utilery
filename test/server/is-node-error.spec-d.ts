import {isNodeError} from '../../src/server/is-node-error.ts';

describe('server/isNodeError', () => {
  it('narrows to a system error with the given codes', () => {
    const error: unknown = new Error('x');
    if (isNodeError(error, 'ENOENT', 'ENOTDIR')) {
      expectTypeOf(error.code).toEqualTypeOf<'ENOENT' | 'ENOTDIR'>();
      expectTypeOf(error.syscall).toEqualTypeOf<string | undefined>();
    }

    if (isNodeError(error)) {
      expectTypeOf(error.code).toEqualTypeOf<string>();
    }
  });
});
