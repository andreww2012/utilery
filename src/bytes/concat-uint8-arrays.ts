import {concatUint8Arrays as concatUint8ArraysBase} from 'uint8array-extras';

/**
 * Joins byte arrays (and `ArrayBuffer`s) into a new `Uint8Array`, like
 * `Buffer.concat`. An empty list gives an empty array.
 *
 * Pass `totalLength` when it is already known, to skip summing the lengths.
 * A larger value pads the result with zeros, a smaller one throws a
 * `RangeError`.
 * @param arrays - The byte arrays to join, in order.
 * @param totalLength - The length of the result (defaults to the sum of the lengths).
 * @returns A new `Uint8Array` with the bytes of all arrays.
 * @example
 * concatUint8Arrays([new Uint8Array([1, 2]), new Uint8Array([3])]);
 * // Uint8Array [1, 2, 3]
 * @example
 * // Join streamed chunks
 * const chunks: Uint8Array[] = [];
 * for await (const chunk of stream) {
 *   chunks.push(chunk);
 * }
 * const body = concatUint8Arrays(chunks);
 */
export const concatUint8Arrays = (
  arrays: readonly (Uint8Array | ArrayBuffer)[],
  totalLength?: number,
) =>
  // Copied, as the package only types a mutable array
  concatUint8ArraysBase([...arrays], totalLength);
