import type {FindGlobalInstanceType as FindGlobalInstanceTypeBase} from 'type-fest';

/**
 * The instance type of the global constructor with the given name, or `never`
 * when there is none.
 * Handy to refer to a type that only exists in some environments, like a DOM
 * type, without requiring it.
 * Only globals declared with `var`, like the built-in ones, are found: a class
 * declared in `declare global` is not, so declare an interface and a `var` for
 * its constructor instead.
 * @example
 * class Point {
 *   constructor(public x: number, public y: number) {}
 * }
 * type PointLike = Point | FindGlobalInstanceType<'DOMPoint'>;
 */
export type FindGlobalInstanceType<Name extends string> = FindGlobalInstanceTypeBase<Name>;
