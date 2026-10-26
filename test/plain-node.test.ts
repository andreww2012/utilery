import {execFileSync} from 'node:child_process';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');

const IMPORT_ALL_SCRIPT = `
import fs from 'node:fs';
import {pathToFileURL} from 'node:url';

const filePaths = fs.globSync('src/**/*.ts', {exclude: ['**/*.d.ts']});
const results = await Promise.allSettled(
  filePaths.map((filePath) => import(pathToFileURL(filePath).href)),
);
console.log(JSON.stringify(Object.fromEntries(results.flatMap((result, i) =>
  result.status === 'rejected' ? [[filePaths[i], String(result.reason)]] : [],
))));
`;

// Scripts, like the one `prepublishOnly` runs, load `src` with plain Node, which, unlike tsdown
// and vitest, can't find the named exports of some CommonJS packages
it('loads every `src` module with plain Node', () => {
  const output = execFileSync(process.execPath, ['--input-type=module'], {
    cwd: ROOT,
    encoding: 'utf8',
    input: IMPORT_ALL_SCRIPT,
  });

  expect(JSON.parse(output)).toStrictEqual({});
});
