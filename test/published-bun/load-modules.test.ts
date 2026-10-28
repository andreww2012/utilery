import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

// Bun users run the built modules, which the tests in Bun never load: Vitest runs `src`.
// Assumes `dist/` is already built (does NOT build); run after `nr build`

const DIST_PATH = path.resolve(import.meta.dirname, '../../dist');

const IMPORT_ALL_SCRIPT = `
import fs from 'node:fs';
import {pathToFileURL} from 'node:url';

const filePaths = JSON.parse(fs.readFileSync(0, 'utf8'));
const results = await Promise.allSettled(
  filePaths.map((filePath) => import(pathToFileURL(filePath).href)),
);
console.log(JSON.stringify(Object.fromEntries(results.flatMap((result, i) =>
  result.status === 'rejected' ? [[filePaths[i], String(result.reason)]] : [],
))));
`;

it('loads every built module with plain Bun', () => {
  const files = fs.globSync('**/*.mjs', {cwd: DIST_PATH});
  if (files.length === 0) {
    throw new Error('Built `dist/` not found. Run `nr build` before the Bun check.');
  }

  // eslint-disable-next-line sonar/no-os-command-from-path -- `bun` is the CI/dev toolchain, resolved from a trusted PATH.
  const output = execFileSync('bun', ['--eval', IMPORT_ALL_SCRIPT], {
    cwd: DIST_PATH,
    encoding: 'utf8',
    input: JSON.stringify(files),
  });

  expect(JSON.parse(output)).toStrictEqual({});
});
