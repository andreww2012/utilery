// cspell:ignore mkdtemp tmpdir
import {mkdir, mkdtemp, rm, symlink, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {isDirectory, isDirectorySync} from '../../src/server/is-directory.ts';
import {isFile, isFileSync} from '../../src/server/is-file.ts';
import {isSymlink, isSymlinkSync} from '../../src/server/is-symlink.ts';

let directory: string;
let file: string;

beforeAll(async () => {
  directory = await mkdtemp(path.join(tmpdir(), 'unutils-path-type-'));
  file = path.join(directory, 'file.txt');
  await Promise.all([writeFile(file, 'text'), mkdir(path.join(directory, 'nested'))]);
});

afterAll(async () => {
  await rm(directory, {recursive: true, force: true});
});

describe('server/isFile, server/isDirectory', () => {
  it('detects files and directories', async () => {
    await Promise.all([
      expect(isFile(file)).resolves.toBe(true),
      expect(isFile(directory)).resolves.toBe(false),
      expect(isDirectory(directory)).resolves.toBe(true),
      expect(isDirectory(file)).resolves.toBe(false),
    ]);

    expect(isFileSync(file)).toBe(true);
    expect(isDirectorySync(file)).toBe(false);
  });

  it('returns `false` for a missing path or one going through a file', async () => {
    await Promise.all([
      expect(isFile(path.join(directory, 'missing'))).resolves.toBe(false),
      expect(isDirectory(path.join(file, 'child'))).resolves.toBe(false),
    ]);

    expect(isFileSync(path.join(file, 'child'))).toBe(false);
    expect(isDirectorySync(path.join(directory, 'missing'))).toBe(false);
  });
});

describe.skipIf(process.platform === 'win32')('server/isSymlink', () => {
  it('detects symbolic links, even broken ones', async () => {
    await Promise.all([
      symlink(file, path.join(directory, 'link')),
      symlink(path.join(directory, 'missing'), path.join(directory, 'broken-link')),
    ]);

    await Promise.all([
      expect(isSymlink(path.join(directory, 'link'))).resolves.toBe(true),
      expect(isSymlink(path.join(directory, 'broken-link'))).resolves.toBe(true),
      expect(isSymlink(file)).resolves.toBe(false),
      expect(isFile(path.join(directory, 'link'))).resolves.toBe(true),
    ]);

    expect(isSymlinkSync(path.join(directory, 'link'))).toBe(true);
    expect(isSymlinkSync(path.join(directory, 'missing'))).toBe(false);
  });
});
