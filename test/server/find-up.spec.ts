// cspell:ignore mkdtemp tmpdir
import {mkdir, mkdtemp, rm, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {findUp, findUpSync} from '../../src/server/find-up.ts';

let root: string;
let deep: string;

beforeAll(async () => {
  root = await mkdtemp(path.join(tmpdir(), 'unutils-find-up-'));
  deep = path.join(root, 'a', 'b', 'c');
  await mkdir(deep, {recursive: true});
  await Promise.all([
    writeFile(path.join(root, 'marker.txt'), ''),
    mkdir(path.join(root, 'a', 'marker.txt')),
  ]);
});

afterAll(async () => {
  await rm(root, {recursive: true, force: true});
});

describe('server/findUp', () => {
  it('finds a file in a parent directory, skipping directories', async () => {
    await expect(findUp('marker.txt', {cwd: deep})).resolves.toBe(path.join(root, 'marker.txt'));
    expect(findUpSync('marker.txt', {cwd: pathToFileURL(deep)})).toBe(
      path.join(root, 'marker.txt'),
    );
  });

  it('finds a directory', async () => {
    await expect(findUp('marker.txt', {cwd: deep, type: 'directory'})).resolves.toBe(
      path.join(root, 'a', 'marker.txt'),
    );
  });

  it('stops at `stopAt`', async () => {
    await expect(
      findUp('marker.txt', {cwd: deep, stopAt: path.join(root, 'a')}),
    ).resolves.toBeUndefined();
    expect(findUpSync('missing-file.txt', {cwd: deep})).toBeUndefined();
  });
});
