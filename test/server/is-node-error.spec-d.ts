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

  it('narrows the code of a system error, but only when it returns `true`', () => {
    const error = new Error('x') as NodeJS.ErrnoException & {code: 'ENOENT' | 'EACCES'};

    if (isNodeError(error, 'ENOENT')) {
      expectTypeOf(error.code).toEqualTypeOf<'ENOENT'>();
    } else {
      expectTypeOf(error.code).toEqualTypeOf<'ENOENT' | 'EACCES'>();
    }
  });

  it('does not narrow an error whose code type already matches the codes', () => {
    const error = new Error('x') as NodeJS.ErrnoException & {code: string};
    const codes = ['ENOENT'] as string[];

    expectTypeOf(isNodeError(error, ...codes)).toEqualTypeOf<boolean>();
    if (!isNodeError(error, ...codes)) {
      expectTypeOf(error).toEqualTypeOf<NodeJS.ErrnoException & {code: string}>();
    }
  });

  it('drops the system errors of a union whose code type the codes cover when it returns `false`', () => {
    const error = undefined as (NodeJS.ErrnoException & {code: string}) | undefined;
    const codes = ['ENOENT'] as string[];

    if (!isNodeError(error, ...codes)) {
      expectTypeOf(error).toEqualTypeOf<undefined>();
    }
  });
});
