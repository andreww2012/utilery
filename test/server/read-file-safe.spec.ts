// cspell:ignore mkdtemp tmpdir
import {mkdtemp, rm, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {readFileSafe} from '../../src/server/read-file-safe.ts';

let directory: string;
let existingFile: string;
const MISSING_FILE = 'does-not-exist.txt';
const TEXT_CONTENTS = 'hello, utilery 👋 — multibyte';

beforeAll(async () => {
  directory = await mkdtemp(path.join(tmpdir(), 'utilery-read-file-safe-'));
  existingFile = path.join(directory, 'file.txt');

  await writeFile(existingFile, TEXT_CONTENTS, 'utf8');
});

afterAll(async () => {
  await rm(directory, {recursive: true, force: true});
});

describe('server/readFileSafe', () => {
  it('reads an existing file as a UTF-8 string by default', async () => {
    await Promise.all([
      expect(readFileSafe(existingFile)).resolves.toBe(TEXT_CONTENTS),
      expect(readFileSafe(existingFile, false)).resolves.toBe(TEXT_CONTENTS),
    ]);
  });

  it('reads an existing file as a Buffer when asBinary is true', async () => {
    const result = await readFileSafe(existingFile, true);

    expect(Buffer.isBuffer(result)).toBe(true);
    expect(result?.toString('utf8')).toBe(TEXT_CONTENTS);
  });

  it('returns null for a missing file in both text and binary modes', async () => {
    await Promise.all([
      expect(readFileSafe(path.join(directory, MISSING_FILE))).resolves.toBeNull(),
      expect(readFileSafe(path.join(directory, MISSING_FILE), true)).resolves.toBeNull(),
    ]);
  });

  it('rethrows errors other than a missing file', async () => {
    await expect(readFileSafe(directory)).rejects.toThrow();
  });
});
