import {isNodeError} from './is-node-error.ts';

/** Turns an error about a missing path into `false`, rethrowing any other error */
// eslint-disable-next-line unicorn/consistent-boolean-name -- An error handler, not a predicate
export const returnFalseIfMissing = (error: unknown) => {
  if (isNodeError(error, 'ENOENT', 'ENOTDIR')) {
    return false;
  }

  throw error;
};

/** Runs a synchronous file system call, turning an error about a missing path into `false` */
export const falseIfMissingSync = <T>(run: () => T) => {
  try {
    return run();
  } catch (error) {
    return returnFalseIfMissing(error);
  }
};
