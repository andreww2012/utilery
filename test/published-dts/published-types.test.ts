import {execFileSync, execSync} from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

// Type-checks the **published** declarations (built + packed) from an isolated
// consumer, covering the gap that `.spec-d.ts` (reads `src/`), `attw` and `publint` miss.
// Each file in `./scenarios` is a standalone consumer module that must compile
// cleanly against the published types; encode negative/precision checks inline
// with `@ts-expect-error` (a regression to `any`/`string` makes the directive
// unused, which is itself a `tsc` error and fails that scenario).
// Assumes `dist/` is already built (does NOT build); run after `nr build`

const __dirname = import.meta.dirname;
const rootPath = path.resolve(__dirname, '../..');
const scenariosDirectoryPath = path.join(__dirname, 'scenarios');
const tscBinPath = path.join(rootPath, 'node_modules/.bin/tsc');

const CONSUMER_COMPILER_OPTIONS = {
  strict: true,
  module: 'nodenext',
  moduleResolution: 'nodenext',
  target: 'esnext',
  noEmit: true,
  // The assertions catch inference breakage on their own; we don't want to
  // fail on unrelated internal declarations of bundled deps
  skipLibCheck: true,
} as const;

// Each subdirectory groups scenarios for one utility, e.g. `regexTyped/infer.ts`
const scenarioFiles = fs
  .readdirSync(scenariosDirectoryPath, {recursive: true, encoding: 'utf8'})
  .filter((file) => file.endsWith('.ts'))
  .toSorted();

const PATH_SEGMENT_SEPARATOR = /[/\\]/;
const GLOBAL_SUFFIX = '.global';

// A `declare global` augmentation takes effect across the whole program, so two mutually
// exclusive ones must never be compiled together: their overloads merge and the assertions
// quietly stop meaning anything. Every `*.global` scenario directory therefore gets a `tsc`
// program to itself, and all remaining scenarios share one. This scales to any number of
// augmentations: the run count grows with them, not with the scenario count
const isolatedDirectories = [
  ...new Set(
    scenarioFiles
      .map((file) => file.split(PATH_SEGMENT_SEPARATOR)[0] || '')
      .filter((directory) => directory.endsWith(GLOBAL_SUFFIX)),
  ),
  // eslint-disable-next-line unicorn/no-array-sort
].sort();

const programs = [
  {
    name: 'shared',
    include: ['**/*.ts'],
    exclude: isolatedDirectories.map((directory) => `${directory}/**`),
  },
  ...isolatedDirectories.map((directory) => ({
    name: directory,
    include: [`${directory}/**/*.ts`],
    exclude: [],
  })),
];

let consumerDirectory: string;
// Maps a scenario file name to the `tsc` error lines emitted for it
const errorsByScenario = new Map<string, string[]>();
const unattributedErrors: string[] = [];

const ERROR_LINE_PATTERN = /^([^(]+\.ts)\(\d+,\d+\): error/;

const recordErrors = (output: string) => {
  for (const line of output.split('\n')) {
    if (!line) {
      continue;
    }

    const file = ERROR_LINE_PATTERN.exec(line)?.[1];
    if (file) {
      const existing = errorsByScenario.get(file) || [];
      existing.push(line);
      errorsByScenario.set(file, existing);
    } else {
      unattributedErrors.push(line);
    }
  }
};

beforeAll(() => {
  if (!fs.existsSync(path.join(rootPath, 'dist/regex/index.d.mts'))) {
    throw new Error(
      'Built `dist/` not found. Run `nr build` before the published-DTS consumer check.',
    );
  }

  consumerDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'unutils-dts-consumer-'));
  const packed = execSync(`pnpm pack --pack-destination ${JSON.stringify(consumerDirectory)}`, {
    cwd: rootPath,
    encoding: 'utf8',
  })
    .trim()
    .split('\n')
    .at(-1)
    ?.trim();
  if (!packed) {
    throw new Error('`pnpm pack` produced no tarball path');
  }

  const tarballPath = path.isAbsolute(packed) ? packed : path.join(consumerDirectory, packed);
  const modulesDirectory = path.join(consumerDirectory, 'node_modules');
  fs.mkdirSync(modulesDirectory);
  execSync(`tar -xzf ${JSON.stringify(tarballPath)} -C node_modules`, {cwd: consumerDirectory});
  // npm/pnpm pack into a top-level `package/` directory
  fs.renameSync(path.join(modulesDirectory, 'package'), path.join(modulesDirectory, 'unutils'));

  for (const file of scenarioFiles) {
    const destination = path.join(consumerDirectory, file);
    fs.mkdirSync(path.dirname(destination), {recursive: true});
    fs.copyFileSync(path.join(scenariosDirectoryPath, file), destination);
  }
  for (const program of programs) {
    const tsconfigName = `tsconfig.${program.name}.json`;
    fs.writeFileSync(
      path.join(consumerDirectory, tsconfigName),
      JSON.stringify(
        {
          compilerOptions: CONSUMER_COMPILER_OPTIONS,
          include: program.include,
          exclude: program.exclude,
        },
        null,
        2,
      ),
    );

    let output = '';
    try {
      execFileSync(tscBinPath, ['--project', tsconfigName, '--pretty', 'false'], {
        cwd: consumerDirectory,
        encoding: 'utf8',
      });
    } catch (error) {
      output = (error as {stdout?: string}).stdout || '';
    }

    recordErrors(output);
  }
}, 120_000);

afterAll(() => {
  if (consumerDirectory) {
    fs.rmSync(consumerDirectory, {recursive: true, force: true});
  }
});

describe('published DTS consumer', () => {
  it('discovers scenario files', () => {
    expect(scenarioFiles.length).toBeGreaterThan(0);
  });

  // Importing a `*.global` entrypoint from a shared-program scenario would silently apply its
  // augmentation to every other scenario, so the isolation is enforced rather than trusted
  it('keeps global augmentation imports inside isolated directories', () => {
    const leaked = scenarioFiles.filter((file) => {
      const directory = file.split(PATH_SEGMENT_SEPARATOR)[0] || '';
      return (
        !directory.endsWith(GLOBAL_SUFFIX) &&
        fs
          .readFileSync(path.join(scenariosDirectoryPath, file), 'utf8')
          .includes(`${GLOBAL_SUFFIX}'`)
      );
    });

    expect(leaked).toStrictEqual([]);
  });

  it.each(scenarioFiles)('%s', (file) => {
    expect(errorsByScenario.get(file) || []).toStrictEqual([]);
  });

  it('produces no errors outside the scenario files', () => {
    expect(unattributedErrors).toStrictEqual([]);
  });
});
