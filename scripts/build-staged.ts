import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {exec} from '../src/server/exec.ts';

// The build writes `exports` and `inlinedDependencies` to `package.json`, and they must match the
// commit. So this builds a copy of the staged files, stages the new `package.json`, and merges its
// changes into the working tree, where `package.json` may have changes that are not staged

const ROOT = path.resolve(import.meta.dirname, '..');
const PACKAGE_JSON_NAME = 'package.json';

const git = async (args: readonly string[]) =>
  (await exec('git', args, {spawnOptions: {cwd: ROOT}})).stdout;

const run = async () => {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'utilery-build-staged-')); // cspell:disable-line

  // Shows the output only when the command fails
  const didSucceedInCopy = async (command: string, args: readonly string[]) => {
    const {exitCode, stdout, stderr} = await exec(command, args, {
      spawnOptions: {cwd: directory},
      throwOnNonZeroExitCode: false,
    });
    if (exitCode !== 0) {
      process.stdout.write(stdout);
      process.stderr.write(stderr);
    }

    return exitCode === 0;
  };

  try {
    await git(['checkout-index', '--all', `--prefix=${directory}/`]);
    const packageJsonCopyPath = path.join(directory, PACKAGE_JSON_NAME);
    const stagedPackageJson = await fs.readFile(packageJsonCopyPath, 'utf8');

    // Not a link to our `node_modules`: the build would place bundled packages outside `dist`.
    // The packages mostly come from the store, so this takes a few seconds
    const isBuilt =
      (await didSucceedInCopy('pnpm', [
        'install',
        '--frozen-lockfile',
        '--prefer-offline',
        '--ignore-scripts',
      ])) &&
      (await didSucceedInCopy(path.join(directory, 'node_modules', '.bin', 'tsdown'), ['--clean']));
    if (!isBuilt) {
      process.exitCode = 1;
      return;
    }

    const builtPackageJson = await fs.readFile(packageJsonCopyPath, 'utf8');
    if (builtPackageJson === stagedPackageJson) {
      return;
    }

    // The base of a line-by-line merge, so it must be the exact staged text, not the JSON written
    // again (like `writeJsonFile` does), or any formatting difference counts as a change
    const stagedPackageJsonPath = path.join(directory, `staged-${PACKAGE_JSON_NAME}`);
    await fs.writeFile(stagedPackageJsonPath, stagedPackageJson);
    const merged = await exec(
      'git',
      ['merge-file', '--stdout', PACKAGE_JSON_NAME, stagedPackageJsonPath, packageJsonCopyPath],
      {spawnOptions: {cwd: ROOT}, throwOnNonZeroExitCode: false},
    );
    if (merged.exitCode !== 0) {
      console.error(
        `The build changes lines of ${PACKAGE_JSON_NAME} next to changes that are not staged: stage or stash them first`,
      );
      process.exitCode = 1;
      return;
    }

    const blobHash = await git([
      'hash-object',
      '-w',
      `--path=${PACKAGE_JSON_NAME}`,
      packageJsonCopyPath,
    ]);
    await git(['update-index', '--cacheinfo', `100644,${blobHash.trim()},${PACKAGE_JSON_NAME}`]); // cspell:disable-line
    await fs.writeFile(path.join(ROOT, PACKAGE_JSON_NAME), merged.stdout);
    console.log(`Staged the changes the build made to ${PACKAGE_JSON_NAME}`);
  } finally {
    await fs.rm(directory, {recursive: true, force: true});
  }
};

await run();
