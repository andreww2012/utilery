import type {NonNegativeInteger} from 'type-fest';

/**
 * `T` if it is a non-negative integer number type, otherwise `never`.
 * The same as `EnsureNonNegative<EnsureInteger<T>>`.
 * Bigints are always integers: use `EnsureNonNegative` for them.
 * @example
 * declare function setLength<T extends number>(length: EnsureNonNegativeInteger<T>): void;
 * setLength(3);
 * // @ts-expect-error: negative
 * setLength(-1);
 */
export type EnsureNonNegativeInteger<T extends number> = NonNegativeInteger<T>;
