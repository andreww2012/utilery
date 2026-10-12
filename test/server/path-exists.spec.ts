// cspell:ignore mkdtemp tmpdir
import {chmod, mkdir, mkdtemp, rm, symlink, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {pathExists} from '../../src/server/path-exists.ts';

let directory: string;

beforeAll(async () => {
  directory = await mkdtemp(path.join(tmpdir(), 'unutils-path-exists-'));
  await writeFile(path.join(directory, 'file.txt'), 'text');
  await mkdir(path.join(directory, 'nested'));
});

afterAll(async () => {
  await rm(directory, {recursive: true, force: true});
});

describe('server/pathExists', () => {
  it('returns true for an existing file or directory', async () => {
    await expect(pathExists(path.join(directory, 'file.txt'))).resolves.toBe(true);
    await expect(pathExists(path.join(directory, 'nested'))).resolves.toBe(true);
  });

  it('returns false for a missing path', async () => {
    await expect(pathExists(path.join(directory, 'missing.txt'))).resolves.toBe(false);
  });

  it('returns false for a path going through a file', async () => {
    await expect(pathExists(path.join(directory, 'file.txt', 'child'))).resolves.toBe(false);
  });

  it.skipIf(process.platform === 'win32')('follows symbolic links', async () => {
    await symlink(path.join(directory, 'missing.txt'), path.join(directory, 'broken-link'));

    await expect(pathExists(path.join(directory, 'broken-link'))).resolves.toBe(false);
  });

  it.skipIf(process.platform === 'win32' || process.getuid?.() === 0)(
    'rethrows errors other than a missing path',
    async () => {
      const lockedDirectory = path.join(directory, 'locked');
      await mkdir(lockedDirectory);
      await chmod(lockedDirectory, 0o000);

      try {
        await expect(pathExists(path.join(lockedDirectory, 'file.txt'))).rejects.toThrow();
      } finally {
        await chmod(lockedDirectory, 0o700);
      }
    },
  );
});
