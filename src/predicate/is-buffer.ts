import {isBuffer as isBufferFromEsToolkit} from 'es-toolkit/predicate';

/**
 * Checks if a value is a Node.js `Buffer` instance.
 * Acts as a TypeScript type guard, narrowing the value to `Buffer`.
 *
 * Returns `false` outside Node-like environments where `Buffer` is not
 * available.
 * @param value - The value to check.
 * @returns `true` if `value` is a `Buffer`, otherwise `false`.
 * @example
 * // Narrowing a Buffer
 * isBuffer(Buffer.from('test'));
 * // true
 * @example
 * // Anything else
 * isBuffer('not a buffer');
 * // false
 * isBuffer(new Uint8Array([1, 2, 3]));
 * // false
 */
export const isBuffer = (value: unknown): value is Buffer => isBufferFromEsToolkit(value);
