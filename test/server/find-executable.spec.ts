// cspell:ignore mkdtemp tmpdir
import {chmod, mkdir, mkdtemp, rm, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {findExecutable, findExecutableSync} from '../../src/server/find-executable.ts';

let first: string;
let second: string;
let searchPath: string;

beforeAll(async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'utilery-find-executable-'));
  first = path.join(root, 'first');
  second = path.join(root, 'second');
  await Promise.all(
    [first, second].map(async (directory) => {
      await mkdir(directory);
      const filePath = path.join(directory, process.platform === 'win32' ? 'tool.cmd' : 'tool');
      await writeFile(filePath, '');
      await chmod(filePath, 0o755);
    }),
  );

  searchPath = [first, second].join(path.delimiter);
});

afterAll(async () => {
  await rm(path.dirname(first), {recursive: true, force: true});
});

describe('server/findExecutable', () => {
  it('finds the first match in `PATH` order', async () => {
    const found = await findExecutable('tool', {path: searchPath});

    expect(found && path.dirname(found)).toBe(first);
    expect(path.dirname(findExecutableSync('tool', {path: searchPath}) ?? '')).toBe(first);
  });

  it('finds every match with `all`', async () => {
    const found = await findExecutable('tool', {path: searchPath, all: true});

    expect(found.map((filePath) => path.dirname(filePath))).toStrictEqual([first, second]);
  });

  it.each(['.CMD', '.cmd'])('finds each file once with `pathExt: %s`', async (pathExt) => {
    const found = await findExecutable('tool', {path: searchPath, pathExt, all: true});
    const foundSync = findExecutableSync('tool', {path: searchPath, pathExt, all: true});

    expect(found.map((filePath) => path.dirname(filePath))).toStrictEqual([first, second]);
    expect(foundSync).toStrictEqual(found);
  });

  it('returns `undefined` or an empty array when nothing is found', async () => {
    await expect(findExecutable('missing-tool', {path: searchPath})).resolves.toBeUndefined();
    expect(findExecutableSync('missing-tool', {path: searchPath, all: true})).toStrictEqual([]);
  });

  it('finds real executables', async () => {
    await expect(findExecutable('node')).resolves.toBeTypeOf('string');
  });
});
