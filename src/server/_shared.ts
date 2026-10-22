import {isNodeError} from './is-node-error.ts';

/** Turns an error about a missing path into `false`, rethrowing any other error */
export const returnFalseIfMissing = (error: unknown) => {
  if (isNodeError(error, 'ENOENT', 'ENOTDIR')) {
    return false;
  }

  throw error;
};
