import {isBun} from '../../src/runtime/is-bun.ts';

const IS_BUN_GLOBAL_DEFINED = 'Bun' in globalThis;

describe('runtime/isBun', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it.runIf(IS_BUN_GLOBAL_DEFINED)('returns `true` in Bun', () => {
    expect(isBun()).toBe(true);
  });

  it.skipIf(IS_BUN_GLOBAL_DEFINED)('returns `false` in Node.js', () => {
    expect(isBun()).toBe(false);
  });

  it('returns `false` without `process`', () => {
    vi.stubGlobal('process', undefined);

    expect(isBun()).toBe(false);
  });

  it('returns `false` with a `process` stand-in that has no `versions`, like in browser bundles', () => {
    vi.stubGlobal('process', {env: {}});

    expect(isBun()).toBe(false);
  });
});
