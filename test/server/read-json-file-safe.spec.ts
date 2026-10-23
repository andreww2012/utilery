// cspell:ignore mkdtemp tmpdir
import {mkdtemp, rm, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {readJsonFileSafe} from '../../src/server/read-json-file-safe.ts';

let directory: string;

beforeAll(async () => {
  directory = await mkdtemp(path.join(tmpdir(), 'unutils-read-json-file-safe-'));
  await Promise.all([
    writeFile(path.join(directory, 'valid.json'), '{"a": 1, "b": [true, null]}'),
    writeFile(path.join(directory, 'with-bom.json'), '\u{FEFF}{"a": 1}'), // cspell:disable-line
    writeFile(path.join(directory, 'invalid.json'), '{a: 1}'),
    writeFile(path.join(directory, 'polluted.json'), '{"__proto__": {"isAdmin": true}}'),
  ]);
});

afterAll(async () => {
  await rm(directory, {recursive: true, force: true});
});

describe('server/readJsonFileSafe', () => {
  it('reads and parses a JSON file', async () => {
    await expect(readJsonFileSafe(path.join(directory, 'valid.json'))).resolves.toStrictEqual({
      a: 1,
      b: [true, null],
    });
  });

  it('ignores a leading byte order mark', async () => {
    await expect(readJsonFileSafe(path.join(directory, 'with-bom.json'))).resolves.toStrictEqual({
      a: 1,
    });
  });

  it('returns null for a missing file', async () => {
    await expect(readJsonFileSafe(path.join(directory, 'missing.json'))).resolves.toBeNull();
  });

  it('throws a SyntaxError with the file path for invalid JSON', async () => {
    const filePath = path.join(directory, 'invalid.json');

    await Promise.all([
      expect(readJsonFileSafe(filePath)).rejects.toThrow(SyntaxError),
      expect(readJsonFileSafe(filePath)).rejects.toThrow(filePath),
    ]);
  });

  it('throws on suspected prototype pollution', async () => {
    await expect(readJsonFileSafe(path.join(directory, 'polluted.json'))).rejects.toThrow();
  });

  it('rethrows errors other than a missing file', async () => {
    await expect(readJsonFileSafe(directory)).rejects.toThrow();
  });
});
