// cspell:ignore mkdtemp tmpdir
import {mkdtemp, rm, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {pathExistsSync} from '../../src/server/path-exists.ts';

let directory: string;

beforeAll(async () => {
  directory = await mkdtemp(path.join(tmpdir(), 'unutils-path-exists-sync-'));
  await writeFile(path.join(directory, 'file.txt'), 'text');
});

afterAll(async () => {
  await rm(directory, {recursive: true, force: true});
});

describe('server/pathExistsSync', () => {
  it('returns whether a path exists', () => {
    expect(pathExistsSync(path.join(directory, 'file.txt'))).toBe(true);
    expect(pathExistsSync(directory)).toBe(true);
    expect(pathExistsSync(path.join(directory, 'missing.txt'))).toBe(false);
    expect(pathExistsSync(path.join(directory, 'file.txt', 'child'))).toBe(false);
  });
});
