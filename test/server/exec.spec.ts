// cspell:ignore mkdtemp tmpdir Привет
import {chmod, mkdir, mkdtemp, rm, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {ExecError, exec} from '../../src/server/exec.ts';

const SPECIAL_ARGUMENTS = ['a b', 'say "hi"', 'x&y', 'Привет, 你好 😀', ''] as const;

let root: string;
let printArgumentsPath: string;

beforeAll(async () => {
  root = await mkdtemp(path.join(tmpdir(), 'utilery-exec-'));
  printArgumentsPath = path.join(root, 'print-arguments');
  await writeFile(
    printArgumentsPath,
    '#!/usr/bin/env node\nconsole.log(JSON.stringify(process.argv.slice(2)));\n',
  );
  await chmod(printArgumentsPath, 0o755);
});

afterAll(async () => {
  await rm(root, {recursive: true, force: true});
});

describe('server/exec', () => {
  it('returns the output and the exit code', async () => {
    const result = await exec(process.execPath, ['-e', 'console.log("hi"); console.error("oops")']);

    expect(result).toMatchObject({stdout: 'hi\n', stderr: 'oops\n', exitCode: 0});
    expect(result.pid).toBeTypeOf('number');
  });

  it('passes the arguments as is', async () => {
    const {stdout} = await exec(process.execPath, [printArgumentsPath, ...SPECIAL_ARGUMENTS]);

    expect(JSON.parse(stdout)).toStrictEqual(SPECIAL_ARGUMENTS);
  });

  it('rejects with `ExecError` when the process exits with a code other than `0`', async () => {
    const result = exec(process.execPath, ['-e', 'process.exit(1)']);

    await Promise.all([
      expect(result).rejects.toBeInstanceOf(ExecError),
      expect(result).rejects.toMatchObject({result: {exitCode: 1}}),
    ]);
  });

  it('resolves with the exit code when `throwOnNonZeroExitCode` is `false`', async () => {
    await expect(
      exec(process.execPath, ['-e', 'process.exit(3)'], {throwOnNonZeroExitCode: false}),
    ).resolves.toMatchObject({exitCode: 3});
  });

  it('rejects with `ENOENT` when the command is not found', async () => {
    await Promise.all([
      expect(exec('utilery-missing-command', ['arg'])).rejects.toMatchObject({code: 'ENOENT'}),
      expect(
        exec('utilery-missing-command', [], {throwOnNonZeroExitCode: false}),
      ).rejects.toMatchObject({code: 'ENOENT'}),
    ]);
  });

  it("doesn't leave unhandled rejections when the command is not found", async () => {
    const onUnhandledRejection = vi.fn<() => void>();
    process.on('unhandledRejection', onUnhandledRejection);
    onTestFinished(() => {
      process.off('unhandledRejection', onUnhandledRejection);
    });

    await expect(exec('utilery-missing-command')).rejects.toMatchObject({code: 'ENOENT'});

    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });

    expect(onUnhandledRejection).not.toHaveBeenCalled();
  });

  it('runs package manager launchers, which are `.cmd` files on Windows', async () => {
    const {stdout} = await exec('npm', ['--version']);

    expect(stdout.trim()).toMatch(/^\d+\.\d+\.\d+/);
  });

  it('runs scripts with a shebang and accepts readonly arguments', async () => {
    const {stdout} = await exec(printArgumentsPath, SPECIAL_ARGUMENTS);

    expect(JSON.parse(stdout)).toStrictEqual(SPECIAL_ARGUMENTS);
  });

  it.runIf(process.platform === 'win32')(
    'escapes the arguments of a `.cmd` launcher in `node_modules/.bin`',
    async () => {
      const binDirectory = path.join(root, 'node_modules', '.bin');
      await mkdir(binDirectory, {recursive: true});
      await writeFile(
        path.join(binDirectory, 'print-arguments.cmd'),
        `@node "${printArgumentsPath}" %*\r\n`,
      );

      const {stdout} = await exec(path.join(binDirectory, 'print-arguments'), [
        'a b',
        'say "hi"',
        'x&y',
      ]);

      expect(JSON.parse(stdout)).toStrictEqual(['a b', 'say "hi"', 'x&y']);
    },
  );
});
