import fs from 'node:fs/promises';
import vm from 'node:vm';
import {isNodeError} from '../../src/server/is-node-error.ts';

const getError = async () =>
  await fs.readFile('/definitely/missing/file').catch((error: unknown) => error);

describe('server/isNodeError', () => {
  it('detects system errors', async () => {
    const error = await getError();

    expect(isNodeError(error)).toBe(true);
    expect(isNodeError(error, 'ENOENT')).toBe(true);
    expect(isNodeError(error, 'EACCES', 'ENOENT')).toBe(true);
    expect(isNodeError(error, 'EACCES')).toBe(false);
  });

  it('rejects other values', () => {
    expect(isNodeError(new Error('x'))).toBe(false);
    expect(isNodeError({code: 'ENOENT'}, 'ENOENT')).toBe(false);
    expect(isNodeError(Object.assign(new Error('x'), {code: 1}))).toBe(false);
    expect(isNodeError(null)).toBe(false);
  });

  it('detects errors from another realm', () => {
    const error: unknown = vm.runInNewContext(
      "Object.assign(new Error('missing'), {code: 'ENOENT'})",
    );

    expect(error instanceof Error).toBe(false);
    expect(isNodeError(error, 'ENOENT')).toBe(true);
  });
});
