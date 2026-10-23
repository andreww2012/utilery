import type {Finite} from 'type-fest';

/**
 * `T` if it is a finite number type, otherwise `never`: `Infinity` and
 * `-Infinity` literals are rejected.
 * Use it in a parameter type to reject such literals at compile time.
 * `NaN` cannot be detected, as it has no literal type.
 * @example
 * declare function setScore<T extends number>(score: EnsureFinite<T>): void;
 * setScore(42);
 * // @ts-expect-error: infinite
 * setScore(Number.POSITIVE_INFINITY as PositiveInfinity);
 */
export type EnsureFinite<T extends number> = Finite<T>;
