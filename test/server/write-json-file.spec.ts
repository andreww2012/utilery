// cspell:ignore mkdtemp tmpdir
import {mkdtemp, readFile, rm, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {writeJsonFile, writeJsonFileSync} from '../../src/server/write-json-file.ts';

let directory: string;

beforeAll(async () => {
  directory = await mkdtemp(path.join(tmpdir(), 'utilery-write-json-file-'));
});

afterAll(async () => {
  await rm(directory, {recursive: true, force: true});
});

describe('server/writeJsonFile', () => {
  it('writes with 2 spaces and a trailing newline, creating directories', async () => {
    const filePath = path.join(directory, 'nested', 'deep', 'new.json');
    await writeJsonFile(filePath, {a: 1, b: [true]});

    await expect(readFile(filePath, 'utf8')).resolves.toBe(
      '{\n  "a": 1,\n  "b": [\n    true\n  ]\n}\n',
    );
  });

  it('keeps the indentation and the missing trailing newline of an existing file', async () => {
    const filePath = path.join(directory, 'tabs.json');
    await writeFile(filePath, '{\n\t"old": 1\n}');
    await writeJsonFile(filePath, {a: 1});

    await expect(readFile(filePath, 'utf8')).resolves.toBe('{\n\t"a": 1\n}');
  });

  it('supports the options', async () => {
    const filePath = path.join(directory, 'options.json');
    await writeJsonFile(filePath, {b: 1, a: {d: 1, c: 2}}, {indent: undefined, sortKeys: true});

    await expect(readFile(filePath, 'utf8')).resolves.toBe('{"a":{"c":2,"d":1},"b":1}\n');
  });

  it('writes synchronously', async () => {
    const filePath = path.join(directory, 'sync.json');
    writeJsonFileSync(filePath, [1]);

    await expect(readFile(filePath, 'utf8')).resolves.toBe('[\n  1\n]\n');
  });

  it('throws for `undefined` data', async () => {
    await expect(writeJsonFile(path.join(directory, 'undefined.json'), undefined)).rejects.toThrow(
      TypeError,
    );
  });

  it('accepts a readonly replacer list', async () => {
    const filePath = path.join(directory, 'replacer.json');
    await writeJsonFile(filePath, {a: 1, b: 2}, {replacer: ['a'] as const});

    await expect(readFile(filePath, 'utf8')).resolves.toBe('{\n  "a": 1\n}\n');
  });
});
