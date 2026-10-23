import type {StringRepeat as StringRepeatBase} from 'type-fest';

/**
 * A string literal type repeated `Count` times, like
 * `String.prototype.repeat` does at runtime.
 * A count with a decimal part is rounded down.
 * @example
 * type A = StringRepeat<'-', 3>;
 * //=> '---'
 * type B = StringRepeat<'=', 2.5>;
 * //=> '=='
 */
export type StringRepeat<S extends string, Count extends number> = StringRepeatBase<S, Count>;
