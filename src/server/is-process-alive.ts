import {isNodeError} from './is-node-error.ts';

/**
 * Checks whether a process with the given ID is running, by sending it the
 * null signal (`0`), which only checks that the process exists.
 *
 * A process that exists but belongs to another user (`EPERM`) counts as
 * running.
 * Other errors (like an invalid ID) are rethrown.
 * @param processId - The ID of the process (a positive integer).
 * @returns `true` if the process is running, otherwise `false`.
 * @example
 * isProcessAlive(process.pid);
 * // true
 * @example
 * // Detect a stale lock file
 * const ownerProcessId = Number(await fs.readFile('app.lock', 'utf8'));
 * if (!isProcessAlive(ownerProcessId)) {
 *   await fs.rm('app.lock');
 * }
 */
export const isProcessAlive = (processId: number) => {
  try {
    process.kill(processId, 0);
    return true;
  } catch (error) {
    if (isNodeError(error, 'ESRCH', 'EPERM')) {
      return error.code === 'EPERM';
    }

    throw error;
  }
};
