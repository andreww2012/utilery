import {parseNodeModulesPath} from '../../src/path/parse-node-modules-path.ts';

describe('path/parseNodeModulesPath', () => {
  it('splits a path inside `node_modules`', () => {
    expect(parseNodeModulesPath('/repo/node_modules/@scope/package/dist/index.js')).toStrictEqual({
      directory: '/repo/node_modules/',
      name: '@scope/package',
      subpath: 'dist/index.js',
    });
    expect(parseNodeModulesPath('/repo/node_modules/lodash')).toStrictEqual({
      directory: '/repo/node_modules/',
      name: 'lodash',
      subpath: undefined,
    });
  });

  it('uses the innermost package of nested dependencies', () => {
    expect(parseNodeModulesPath('/repo/node_modules/a/node_modules/b/index.js')).toStrictEqual({
      directory: '/repo/node_modules/a/node_modules/',
      name: 'b',
      subpath: 'index.js',
    });
  });

  it('supports Windows paths', () => {
    expect(
      parseNodeModulesPath(String.raw`C:\repo\node_modules\@scope\package\index.js`),
    ).toStrictEqual({
      directory: 'C:\\repo\\node_modules\\',
      name: '@scope/package',
      subpath: 'index.js',
    });
  });

  it('returns `undefined` outside `node_modules`', () => {
    expect(parseNodeModulesPath('/repo/src/index.ts')).toBeUndefined();
    expect(parseNodeModulesPath('/repo/node_modules/')).toBeUndefined();
  });

  it('supports relative paths and a trailing separator', () => {
    expect(parseNodeModulesPath('node_modules/foo/index.js')).toStrictEqual({
      directory: 'node_modules/',
      name: 'foo',
      subpath: 'index.js',
    });
    expect(parseNodeModulesPath('/repo/node_modules/foo/')).toStrictEqual({
      directory: '/repo/node_modules/',
      name: 'foo',
      subpath: undefined,
    });
    expect(parseNodeModulesPath('/repo/my_node_modules/foo/index.js')).toBeUndefined();
  });
});
