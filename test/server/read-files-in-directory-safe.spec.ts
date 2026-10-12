// cspell:ignore mkdtemp tmpdir
import {rmSync} from 'node:fs';
import {mkdir, mkdtemp, rm, symlink, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {readFilesInDirectorySafe} from '../../src/server/read-files-in-directory-safe.ts';

let directory: string;

beforeAll(async () => {
  directory = await mkdtemp(path.join(tmpdir(), 'unutils-read-files-in-directory-safe-'));
  await mkdir(path.join(directory, 'nested', 'deeper'), {recursive: true});
  await writeFile(path.join(directory, 'b.json'), '{}');
  await writeFile(path.join(directory, 'a.md'), '# A');
  await writeFile(path.join(directory, 'types.d.ts'), 'export {};');
  await writeFile(path.join(directory, 'nested', 'c.md'), '# C');
  await writeFile(path.join(directory, 'nested', 'deeper', 'd.md'), '# D');
});

afterAll(async () => {
  await rm(directory, {recursive: true, force: true});
});

const toRelativePaths = (files: {relativePath: string}[] | null) =>
  files?.map(({relativePath}) => relativePath);

describe('server/readFilesInDirectorySafe', () => {
  it('reads the files of a directory, sorted by their relative paths', async () => {
    await expect(readFilesInDirectorySafe(directory)).resolves.toStrictEqual([
      {path: path.join(directory, 'a.md'), relativePath: 'a.md', contents: '# A'},
      {path: path.join(directory, 'b.json'), relativePath: 'b.json', contents: '{}'},
      {
        path: path.join(directory, 'types.d.ts'),
        relativePath: 'types.d.ts',
        contents: 'export {};',
      },
    ]);
  });

  it('reads nested files with recursive: true, using forward slashes in relative paths', async () => {
    const files = await readFilesInDirectorySafe(directory, {recursive: true});

    expect(toRelativePaths(files)).toStrictEqual([
      'a.md',
      'b.json',
      'nested/c.md',
      'nested/deeper/d.md',
      'types.d.ts',
    ]);
    expect(files?.[2]?.path).toBe(path.join(directory, 'nested', 'c.md'));
  });

  it('only reads the files with the given extensions', async () => {
    await expect(
      readFilesInDirectorySafe(directory, {recursive: true, extensions: 'md'}).then(
        toRelativePaths,
      ),
    ).resolves.toStrictEqual(['a.md', 'nested/c.md', 'nested/deeper/d.md']);
    await expect(
      readFilesInDirectorySafe(directory, {extensions: ['.json', '.d.ts']}).then(toRelativePaths),
    ).resolves.toStrictEqual(['b.json', 'types.d.ts']);
  });

  it('only reads the files passing the filter', async () => {
    await expect(
      readFilesInDirectorySafe(directory, {
        recursive: true,
        extensions: 'md',
        filter: (relativePath) => !relativePath.startsWith('nested/deeper/'),
      }).then(toRelativePaths),
    ).resolves.toStrictEqual(['a.md', 'nested/c.md']);
  });

  it('reads raw bytes with asBinary: true', async () => {
    const files = await readFilesInDirectorySafe(directory, {asBinary: true, extensions: 'json'});

    expect(Buffer.isBuffer(files?.[0]?.contents)).toBe(true);
    expect(files?.[0]?.contents.toString('utf8')).toBe('{}');
  });

  it.skipIf(process.platform === 'win32')('skips symbolic links', async () => {
    const linkDirectory = await mkdtemp(path.join(tmpdir(), 'unutils-read-files-links-'));
    await writeFile(path.join(linkDirectory, 'file.txt'), 'text');
    await symlink(path.join(linkDirectory, 'file.txt'), path.join(linkDirectory, 'link.txt'));

    try {
      await expect(
        readFilesInDirectorySafe(linkDirectory).then(toRelativePaths),
      ).resolves.toStrictEqual(['file.txt']);
    } finally {
      await rm(linkDirectory, {recursive: true, force: true});
    }
  });

  it('skips a file deleted after the directory was listed', async () => {
    const changingDirectory = await mkdtemp(path.join(tmpdir(), 'unutils-read-files-deleted-'));
    await writeFile(path.join(changingDirectory, 'kept.txt'), 'kept');
    await writeFile(path.join(changingDirectory, 'deleted.txt'), 'deleted');

    try {
      await expect(
        readFilesInDirectorySafe(changingDirectory, {
          filter: (relativePath) => {
            if (relativePath === 'deleted.txt') {
              rmSync(path.join(changingDirectory, relativePath));
            }

            return true;
          },
        }).then(toRelativePaths),
      ).resolves.toStrictEqual(['kept.txt']);
    } finally {
      await rm(changingDirectory, {recursive: true, force: true});
    }
  });

  it('returns null for a missing directory', async () => {
    await expect(readFilesInDirectorySafe(path.join(directory, 'missing'))).resolves.toBeNull();
  });

  it('rethrows errors other than a missing directory', async () => {
    await expect(readFilesInDirectorySafe(path.join(directory, 'a.md'))).rejects.toThrow();
  });
});
