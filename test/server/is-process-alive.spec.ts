import {isProcessAlive} from '../../src/server/is-process-alive.ts';

describe('server/isProcessAlive', () => {
  it('returns `true` for a running process', () => {
    expect(isProcessAlive(process.pid)).toBe(true);
  });

  it('returns `false` for a missing process', () => {
    expect(isProcessAlive(2 ** 22 + 12_345)).toBe(false);
  });

  it('rethrows other errors', () => {
    expect(() => isProcessAlive(Number.NaN)).toThrow();
  });
});
