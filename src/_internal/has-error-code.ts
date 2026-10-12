/** Whether the value is a Node.js system error (like one thrown by `fs`) with one of the codes */
export const hasErrorCode = (error: unknown, ...codes: string[]) =>
  error != null &&
  typeof error === 'object' &&
  'code' in error &&
  typeof error.code === 'string' &&
  codes.includes(error.code);
