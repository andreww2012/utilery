import os from 'node:os';
import path from 'node:path';
import {getAppPaths} from '../../src/server/get-app-paths.ts';

describe('server/getAppPaths', () => {
  it('returns all directories with the suffixed name', () => {
    const paths = getAppPaths('my-app');

    expect(Object.keys(paths).toSorted()).toStrictEqual(['cache', 'config', 'data', 'log', 'temp']);

    Object.values(paths).forEach((directory) => {
      expect(path.isAbsolute(directory)).toBe(true);
      expect(directory).toContain('my-app-nodejs');
    });
  });

  it('can leave the name as is', () => {
    expect(path.basename(getAppPaths('my-app', {suffix: ''}).temp)).toBe('my-app');
  });

  it.runIf(process.platform === 'linux')('follows XDG variables on Linux', () => {
    vi.stubEnv('XDG_CACHE_HOME', '/xdg-cache');

    expect(getAppPaths('my-app', {suffix: ''}).cache).toBe('/xdg-cache/my-app');

    vi.unstubAllEnvs();
  });

  it.runIf(process.platform === 'darwin')('uses the Library directory on macOS', () => {
    expect(getAppPaths('my-app').cache).toBe(
      path.join(os.homedir(), 'Library', 'Caches', 'my-app-nodejs'),
    );
  });

  it('throws for unsafe names', () => {
    expect(() => getAppPaths('')).toThrow();
    expect(() => getAppPaths('..')).toThrow();
    expect(() => getAppPaths('a/b')).toThrow();
  });
});
