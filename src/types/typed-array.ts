import type {TypedArray as TypedArrayBase} from 'type-fest';

/**
 * Any typed array, like `Uint8Array` or `Float64Array`.
 * `Float16Array` is included only when the TypeScript `lib` has it (`ES2025`
 * or later).
 * To check a value at runtime, use `isTypedArray`.
 * @example
 * const byteLengthOf = (values: TypedArray) => values.byteLength;
 */
export type TypedArray = TypedArrayBase;
