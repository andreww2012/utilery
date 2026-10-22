import fs from 'node:fs';
import {getBuiltinModule} from '../../src/runtime/get-builtin-module.ts';

describe('runtime/getBuiltinModule', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('loads built-in modules with or without the `node:` prefix', () => {
    expect(getBuiltinModule('node:fs')).toBe(fs);
    expect(getBuiltinModule('fs')).toBe(fs);
  });

  it('returns `undefined` without `process`', () => {
    vi.stubGlobal('process', undefined);

    expect(getBuiltinModule('node:fs')).toBeUndefined();
  });
});
