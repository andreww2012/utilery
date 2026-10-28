import type {SpawnOptions} from 'node:child_process';
import {verifyENOENT} from 'cross-spawn/lib/enoent.js';
import parseCommand from 'cross-spawn/lib/parse.js';
import {ExecError as ExecErrorBase, exec as execBase} from 'es-toolkit/server';
import type {OmitStrict} from '../types/omit-strict.ts';

interface ExecOptions {
  /** Stops the process when aborted, rejecting with an `AbortError` (see `isAbortError`) */
  signal?: AbortSignal;

  /**
   * Stops the process after this many milliseconds, rejecting with an
   * `AbortError` (see `isAbortError`)
   */
  timeout?: number;

  /** Written to the standard input of the process, which is then closed */
  stdin?: string;

  /** Options of `child_process.spawn`, like `cwd` and `env` */
  spawnOptions?: SpawnOptions;

  /**
   * Rejects with an `ExecError` when the process exits with a code other than
   * `0`, or is stopped by a signal.
   * Defaults to `true`
   */
  throwOnNonZeroExitCode?: boolean;
}

/** The result of a process run by `exec` */
interface ExecResult {
  /** The ID of the process, or `undefined` if it could not be started */
  pid: number | undefined;

  /** The standard output, decoded as UTF-8 */
  stdout: string;

  /** The standard error output, decoded as UTF-8 */
  stderr: string;

  /** The exit code, or `null` if the process was stopped by a signal */
  exitCode: number | null;
}

/**
 * Runs a command and returns its output once it exits.
 * The command is run directly, without a shell, so its arguments need no
 * quoting.
 * On Windows, `.cmd` and `.bat` launchers (like `npm`) and scripts with a
 * shebang run too, through `cmd.exe` with their arguments escaped for it.
 * @param command - The command to run, like `'git'`.
 * @param args - The arguments of the command.
 * @param options - Options.
 * @param options.signal - Stops the process when aborted.
 * @param options.timeout - Stops the process after this many milliseconds.
 * @param options.stdin - Written to the standard input of the process.
 * @param options.spawnOptions - Options of `child_process.spawn`, like `cwd` and `env`.
 * @param options.throwOnNonZeroExitCode - Rejects with an `ExecError` when the process exits with
 * a code other than `0`, or is stopped by a signal.
 * Defaults to `true`.
 * @returns A promise of the process ID, the output and the exit code.
 * @throws {ExecError} When the process exits with a code other than `0` or is stopped by a
 * signal, unless `throwOnNonZeroExitCode` is `false`.
 * Its `result` property has the output and the exit code.
 * @throws {Error} With the `ENOENT` code when the command is not found, on every platform (see
 * `isNodeError`).
 * @example
 * const {stdout} = await exec('git', ['rev-parse', 'HEAD']);
 * @example
 * // Check the exit code instead of catching an error
 * const {exitCode} = await exec('git', ['diff', '--quiet'], {throwOnNonZeroExitCode: false});
 * const hasChanges = exitCode === 1;
 */
export const exec = async (
  command: string,
  args: readonly string[] = [],
  options: ExecOptions = {},
): Promise<ExecResult> => {
  // A plain `spawn` can't run `.cmd` and `.bat` files or scripts with a shebang on Windows
  const parsed = parseCommand(command, args, options.spawnOptions);
  const result = await execBase(parsed.command, parsed.args, {
    ...options,
    spawnOptions: parsed.options,
    throwOnNonZeroExitCode: false,
  });

  // Where `spawn` would fail with `ENOENT`, `cmd.exe` exits with `1`
  const notFoundError = verifyENOENT(result.exitCode, parsed);
  if (notFoundError) {
    throw notFoundError;
  }

  if ((options.throwOnNonZeroExitCode ?? true) && result.exitCode !== 0) {
    throw new ExecErrorBase(result);
  }

  return result;
};

interface ExecErrorConstructor extends OmitStrict<typeof ExecErrorBase, 'prototype'> {
  /**
   * Creates the error `exec` rejects with when the process exits with a code
   * other than `0`, or is stopped by a signal.
   * @param result - The process ID, the output and the exit code of the process
   */
  new (result: ExecResult): ExecError;
  readonly prototype: ExecError;
}

/**
 * The error `exec` rejects with when the process exits with a code other than
 * `0`, or is stopped by a signal.
 * Its `result` property has the process ID, the output and the exit code.
 * @example
 * try {
 *   await exec('npm', ['test']);
 * } catch (error) {
 *   if (error instanceof ExecError) {
 *     console.error(error.result.stderr);
 *   }
 * }
 */
export const ExecError: ExecErrorConstructor = ExecErrorBase;

/**
 * The error `exec` rejects with when the process exits with a code other than
 * `0`, or is stopped by a signal
 */
// eslint-disable-next-line ts/no-redeclare -- merged with the constant above so the name works both with `instanceof` and as a type
export type ExecError = ExecErrorBase;
