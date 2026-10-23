import {random} from 'nanoid';

/**
 * Generates a `Uint8Array` of `bytes` cryptographically secure random bytes.
 * Handy as a random source for a custom ID generator (see `nanoidFactory`) or
 * anywhere secure random bytes are needed.
 * @param bytes - The number of random bytes to generate.
 * @returns An array of `bytes` cryptographically secure random bytes.
 * @example
 * randomBytes(16);
 * // Uint8Array(16) [39, 201, ...]
 */
// eslint-disable-next-line unicorn/prefer-export-from -- re-declared to attach rewritten JSDoc; an `export ... from` would inherit the upstream docs
export const randomBytes = random;
