import {toUint8Array as toUint8ArrayBase} from 'uint8array-extras';

/**
 * Views any typed array, `ArrayBuffer` or `DataView` as a plain `Uint8Array`
 * over the same memory, without copying.
 * Useful to turn a Node.js `Buffer`, which changes some `Uint8Array` behavior,
 * into a plain `Uint8Array`.
 *
 * The result shares memory with the input: call `.slice()` on it for a copy.
 * Throws a `TypeError` for other values.
 * @param value - The typed array, `ArrayBuffer` or `DataView` to view.
 * @returns A `Uint8Array` over the same bytes.
 * @example
 * toUint8Array(new Uint16Array([1, 256]));
 * // Uint8Array [1, 0, 0, 1] (on little-endian platforms)
 * @example
 * // A plain `Uint8Array` instead of a `Buffer`
 * toUint8Array(Buffer.from('Hi'));
 * // Uint8Array [72, 105]
 */
// eslint-disable-next-line unicorn/prefer-export-from -- re-declared to attach rewritten JSDoc; an `export ... from` would inherit the upstream docs
export const toUint8Array = toUint8ArrayBase;
